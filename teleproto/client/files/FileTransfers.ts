import { setTimeout as sleep } from "node:timers/promises";
import { Api } from "../../tl";
import { FileMigrateError, MediaAbortError } from "../../errors";
import type { TelegramBaseClient } from "../TelegramBaseClient";
import { RequestState } from "../../network/mtproto/RequestState";
import { SlotRemovedError, type SessionSlot } from "../../network/dc/SessionSlot";
import { downloadDcId, downloadSmallDcId, uploadDcId } from "../../network/dc/dcId";
import { ResourceManager } from "./ResourceManager";
import { MAX_PART_SIZE } from "./PartsManager";

export type TransferKind = "download" | "downloadSmall" | "upload" | "cdn";

const SMALL_FILE_SIZE = 20 * 1024;
const SMALL_QUEUE_FILE_SIZE = 20 * 1024 * 1024;
const DEFAULT_SMALL_QUEUE = 5;
const DEFAULT_LARGE_QUEUE = 2;
const DEFAULT_MAX_FILE_PARTS = 4000;
const DEFAULT_MAX_FILE_PARTS_PREMIUM = 8000;
const DOWNLOAD_RESOURCE_LIMIT = 2 * 1024 * 1024;
const DOWNLOAD_RESOURCE_LIMIT_PREMIUM = 16 * 1024 * 1024;
const UPLOAD_RESOURCE_LIMIT = 4 * 1024 * 1024;
const RETRY_BUDGET_MS = 60_000;
const RETRY_BUDGET_BOT_MS = 8_000;
const MAX_FLOOD_WAIT_S = 14 * 24 * 3600;
const MAX_LOST_SESSIONS = 5;

export interface TransferBalance {
    sessions?: number;
    inFlight?: number;
    partSize?: number;
}

export interface FileTransferOptions {
    cdnSupported?: boolean;
    partSize?: number;
    sessions?: number;
    inflightPerDc?: number;
    download?: TransferBalance;
    upload?: TransferBalance;
}

export function transferKindFor(size: number | undefined): TransferKind {
    return size !== undefined && size > 0 && size < SMALL_FILE_SIZE ? "downloadSmall" : "download";
}

function floodSeconds(error: { seconds?: number; errorMessage?: string }): number | undefined {
    const message = error.errorMessage ?? "";
    if (!/^FLOOD_(?:PREMIUM_|TEST_PHONE_)?WAIT_/.test(message)) return undefined;
    const seconds = typeof error.seconds === "number" ? error.seconds : Number(message.split("_").pop());
    return Math.min(Math.max(Number.isFinite(seconds) ? seconds : 1, 1), MAX_FLOOD_WAIT_S);
}

function isRetryableServerError(error: { code?: number; errorMessage?: string }): boolean {
    if (error.errorMessage === "WORKER_BUSY_TOO_LONG_RETRY" || error.errorMessage === "FLOOD_SKIP_FAILED_WAIT") return true;
    return typeof error.code === "number" && (error.code >= 500 || error.code < 0);
}

function isLostSession(error: unknown): boolean {
    return error instanceof SlotRemovedError || (error as { errorMessage?: string })?.errorMessage === "AUTH_KEY_UNREGISTERED";
}

interface OperationQueue {
    active: number;
    waiters: (() => void)[];
}

export class FileTransfers {
    private readonly managers = new Map<string, ResourceManager>();
    private readonly operations = new Map<string, OperationQueue>();
    private speedLimitLogged = false;
    private configRefresh?: Promise<void>;

    constructor(
        private readonly client: TelegramBaseClient,
        private readonly opts: FileTransferOptions = {}
    ) {}

    get cdnEnabled(): boolean {
        return this.opts.cdnSupported ?? true;
    }

    get maxPartSize(): number {
        return Math.min(this.opts.partSize ?? MAX_PART_SIZE, MAX_PART_SIZE);
    }

    private get premium(): boolean {
        return !!this.client._premium;
    }

    private async appNumber(key: string, fallback: number): Promise<number> {
        const value = (await this.client._getAppConfig())[key];
        return typeof value === "number" && value > 0 ? value : fallback;
    }

    async cdnReachable(dcId: number): Promise<boolean> {
        if (this.client._addresses.isCdn(dcId)) return true;
        this.configRefresh ??= this.client._reloadConfig().finally(() => (this.configRefresh = undefined));
        await this.configRefresh;
        return this.client._addresses.isCdn(dcId);
    }

    maxUploadParts(): Promise<number> {
        return this.premium
            ? this.appNumber("upload_max_fileparts_premium", DEFAULT_MAX_FILE_PARTS_PREMIUM)
            : this.appNumber("upload_max_fileparts_default", DEFAULT_MAX_FILE_PARTS);
    }

    async acquireDownload(dcId: number, size: number | undefined, signal?: AbortSignal): Promise<() => void> {
        const large = size !== undefined && size > SMALL_QUEUE_FILE_SIZE;
        const limit = large
            ? await this.appNumber("large_queue_max_active_operations_count", DEFAULT_LARGE_QUEUE)
            : await this.appNumber("small_queue_max_active_operations_count", DEFAULT_SMALL_QUEUE);
        const key = `${dcId}:${large ? "large" : "small"}`;
        let queue = this.operations.get(key);
        if (!queue) this.operations.set(key, (queue = { active: 0, waiters: [] }));
        const owned = queue;
        while (owned.active >= limit) {
            if (signal?.aborted) throw new MediaAbortError();
            await new Promise<void>((resolve, reject) => {
                const onAbort = () => {
                    owned.waiters.splice(owned.waiters.indexOf(wake), 1);
                    reject(new MediaAbortError());
                };
                const wake = () => {
                    signal?.removeEventListener("abort", onAbort);
                    resolve();
                };
                owned.waiters.push(wake);
                signal?.addEventListener("abort", onAbort, { once: true });
            });
        }
        owned.active++;
        let released = false;
        return () => {
            if (released) return;
            released = true;
            owned.active--;
            owned.waiters.shift()?.();
        };
    }

    sessionCount(kind: TransferKind, dcId: number): number {
        if (kind === "cdn") return 1;
        const override = kind === "upload" ? this.opts.upload?.sessions : this.opts.download?.sessions;
        const configured = override ?? this.opts.sessions;
        if (configured && configured > 0) return Math.min(configured, 16);
        if (kind === "upload") return this.premium || (dcId !== 2 && dcId !== 4) ? 8 : 4;
        return this.premium ? 8 : 2;
    }

    manager(kind: TransferKind, dcId: number): ResourceManager {
        const key = kind === "upload" ? "upload" : `${kind}:${dcId}`;
        let manager = this.managers.get(key);
        if (!manager) {
            manager = new ResourceManager(this.resourceLimit(kind, dcId), kind === "upload" ? "greedy" : "baseline");
            this.managers.set(key, manager);
        }
        return manager;
    }

    private resourceLimit(kind: TransferKind, dcId: number): number {
        const balance = kind === "upload" ? this.opts.upload : this.opts.download;
        const inFlight = balance?.inFlight ?? this.opts.inflightPerDc;
        if (inFlight && inFlight > 0) return inFlight * this.sessionCount(kind, dcId) * (balance?.partSize ?? this.maxPartSize);
        if (kind === "upload") return UPLOAD_RESOURCE_LIMIT;
        return this.premium ? DOWNLOAD_RESOURCE_LIMIT_PREMIUM : DOWNLOAD_RESOURCE_LIMIT;
    }

    private slot(kind: TransferKind, dcId: number): SessionSlot {
        const count = this.sessionCount(kind, dcId);
        const shift = kind === "upload" ? uploadDcId : kind === "downloadSmall" ? downloadSmallDcId : downloadDcId;
        let best: SessionSlot[] = [];
        let bestLoad = Infinity;
        for (let index = 0; index < count; index++) {
            const slot = this.client._network.getSession(shift(dcId, index));
            if (slot.load < bestLoad) {
                best = [slot];
                bestLoad = slot.load;
            } else if (slot.load === bestLoad) {
                best.push(slot);
            }
        }
        return best[Math.floor(Math.random() * best.length)];
    }

    async run<R extends Api.AnyRequest>(
        kind: TransferKind,
        dcId: number,
        build: () => R,
        signal?: AbortSignal
    ): Promise<R["__response"]> {
        const budget = this.client._bot ? RETRY_BUDGET_BOT_MS : RETRY_BUDGET_MS;
        let waited = 0;
        let backoffS = 1;
        let lostSessions = 0;
        for (;;) {
            if (signal?.aborted) throw new MediaAbortError();
            const slot = this.slot(kind, dcId);
            slot.enter();
            try {
                const session = await slot.ensureConnected();
                return (await this.send(session, slot, build(), signal)) as R["__response"];
            } catch (error) {
                if (signal?.aborted || error instanceof MediaAbortError) throw new MediaAbortError();
                if (error instanceof FileMigrateError) throw error;
                if (isLostSession(error)) {
                    if (++lostSessions > MAX_LOST_SESSIONS) throw error;
                    continue;
                }
                const flood = floodSeconds(error as never);
                const premiumWait = /^FLOOD_PREMIUM_WAIT_/.test((error as { errorMessage?: string }).errorMessage ?? "");
                let delayS: number;
                if (premiumWait && flood !== undefined) {
                    if (!this.speedLimitLogged) {
                        this.speedLimitLogged = true;
                        this.client._log.info(`Telegram limits ${kind} speed for accounts without Premium, waiting ${flood}s between parts`);
                    }
                    try {
                        await sleep(flood * 1000, undefined, { signal });
                    } catch {
                        throw new MediaAbortError();
                    }
                    continue;
                } else if (flood !== undefined) {
                    delayS = flood;
                    backoffS = 1;
                } else if (isRetryableServerError(error as never)) {
                    delayS = backoffS;
                    if (backoffS < 60) backoffS *= 2;
                } else {
                    throw error;
                }
                if (waited + delayS * 1000 > budget) throw error;
                waited += delayS * 1000;
                this.client._log.debug(`${kind} part on dc ${dcId} retries in ${delayS}s: ${(error as Error).message}`);
                try {
                    await sleep(delayS * 1000, undefined, { signal });
                } catch {
                    throw new MediaAbortError();
                }
            } finally {
                slot.leave();
            }
        }
    }

    private send(
        session: { addStateToQueue(state: RequestState): void; cancelRequest(state: RequestState, reason: unknown): void },
        slot: SessionSlot,
        request: Api.AnyRequest,
        signal?: AbortSignal
    ): Promise<unknown> {
        const state = new RequestState(request);
        session.addStateToQueue(state);
        return new Promise((resolve, reject) => {
            const cleanup = () => {
                offDeath();
                signal?.removeEventListener("abort", onAbort);
            };
            const offDeath = slot.onDeath((reason) => {
                cleanup();
                reject(new SlotRemovedError(reason));
            });
            const onAbort = () => {
                cleanup();
                session.cancelRequest(state, new MediaAbortError());
                reject(new MediaAbortError());
            };
            signal?.addEventListener("abort", onAbort, { once: true });
            state.promise.then(
                (value) => {
                    cleanup();
                    resolve(value);
                },
                (error) => {
                    cleanup();
                    reject(error);
                }
            );
        });
    }

    reset() {
        this.managers.clear();
        this.operations.clear();
    }
}
