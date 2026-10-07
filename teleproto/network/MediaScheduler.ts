import bigInt from "big-integer";
import { Api } from "../tl";
import { Network } from "./Network";
import {
    BalancePolicy,
    BalancePolicyOptions,
    DOWNLOAD_BALANCE,
    UPLOAD_BALANCE,
    normalizeBalanceOptions,
} from "./BalancePolicy";
import { downloadDcId, uploadDcId, ShiftedDcId } from "./core_types";
import { SlotRemovedError } from "./SenderSlot";
import {
    FileMigrateError,
    FloodWaitError,
    FloodTestPhoneWaitError,
    ServerError,
    TimedOutError,
} from "../errors";
import type { TelegramBaseClient } from "../client/telegramBaseClient";

const ONE_MB = 1024 * 1024;
const MIN_CHUNK = 4096;
const LIMITED_UPLOAD_DCS = new Set([2, 4]);
const LIMITED_UPLOAD_SESSIONS = 4;
const SPACING_START_MS = 50;
const SPACING_MIN_MS = 3;
const SPACING_DECAY = 0.8;
const SPACING_IDLE_MS = 1000;
const SERVER_RETRY_CAP_MS = 16_000;

export interface MediaSchedulerOptions {

    partSize: number;

    requestRetries: number;

    requestDeadlineMs: number;

    cdnSupported: boolean;

    download: BalancePolicyOptions;

    upload: BalancePolicyOptions;
}

export const DEFAULT_MEDIA_SCHEDULER_OPTIONS: MediaSchedulerOptions = {
    partSize: 512 * 1024,
    requestRetries: 5,
    requestDeadlineMs: 15_000,
    cdnSupported: false,
    download: DOWNLOAD_BALANCE,
    upload: UPLOAD_BALANCE,
};

export class CdnRedirectError extends Error {
    constructor(public readonly redirect: Api.upload.FileCdnRedirect) {
        super("upload.fileCdnRedirect");
        this.name = "CdnRedirectError";
    }
}

export class MediaAbortError extends Error {
    constructor() {
        super("Media operation aborted");
        this.name = "MediaAbortError";
    }
}

type Kind = "download" | "upload";

class DcBalance {
    readonly policy: BalancePolicy;

    readonly shiftedById = new Map<number, ShiftedDcId>();
    readonly waiters: Array<() => void> = [];
    completed = 0;
    private _spacingMs = SPACING_START_MS;
    private _nextSendAt = 0;

    constructor(
        readonly dcId: number,
        readonly kind: Kind,
        opts: BalancePolicyOptions
    ) {
        if (kind === "upload" && LIMITED_UPLOAD_DCS.has(dcId)) {
            opts = {
                ...opts,
                sessions: Math.min(opts.sessions, LIMITED_UPLOAD_SESSIONS),
            };
        }
        this.policy = new BalancePolicy(opts);
        this.policy.sessionIds.forEach((id, i) => {
            this.shiftedById.set(
                id,
                kind === "download" ? downloadDcId(dcId, i) : uploadDcId(dcId, i)
            );
        });
    }

    async pace(signal?: AbortSignal): Promise<void> {
        const now = Date.now();
        if (now - this._nextSendAt > SPACING_IDLE_MS) {
            this._spacingMs = SPACING_START_MS;
        }
        const at = Math.max(now, this._nextSendAt);
        this._nextSendAt = at + this._spacingMs;
        this._spacingMs = Math.max(SPACING_MIN_MS, this._spacingMs * SPACING_DECAY);
        if (at > now) await sleepOrAbort(at - now, signal);
    }

    wakeOne(): void {
        const w = this.waiters.shift();
        if (w) w();
    }

    wakeAll(): void {
        for (const w of this.waiters.splice(0)) w();
    }
}

export class MediaScheduler {
    readonly opts: MediaSchedulerOptions;
    private readonly _client: TelegramBaseClient;
    private readonly _network: Network;
    private readonly _balances = new Map<string, DcBalance>();
    private _closed = false;

    constructor(
        client: TelegramBaseClient,
        network: Network,
        opts?: Partial<MediaSchedulerOptions> & {

            inflightPerDc?: number;
            maxSessions?: number;
            sessions?: number;
        }
    ) {
        this._client = client;
        this._network = network;
        const merged: MediaSchedulerOptions = {
            ...DEFAULT_MEDIA_SCHEDULER_OPTIONS,
            ...(opts || {}),
            download: { ...DEFAULT_MEDIA_SCHEDULER_OPTIONS.download },
            upload: { ...DEFAULT_MEDIA_SCHEDULER_OPTIONS.upload },
        };
        if (opts && typeof opts === "object") {

            if (opts.inflightPerDc && opts.inflightPerDc > 0) {
                merged.download.inFlight = opts.inflightPerDc;
                merged.upload.inFlight = opts.inflightPerDc;
            }
            if (opts.sessions && opts.sessions > 0) {
                merged.download.sessions = opts.sessions;
                merged.upload.sessions = opts.sessions;
            }
            if ((opts as any).download) {
                merged.download = normalizeBalanceOptions(
                    (opts as any).download,
                    merged.download
                );
            }
            if ((opts as any).upload) {
                merged.upload = normalizeBalanceOptions(
                    (opts as any).upload,
                    merged.upload
                );
            }
        }
        if (merged.partSize > ONE_MB) merged.partSize = ONE_MB;
        if (merged.partSize % MIN_CHUNK !== 0) {
            throw new Error("partSize must be a multiple of 4096");
        }
        merged.download.partSize = merged.partSize;
        merged.download = normalizeBalanceOptions(merged.download, merged.download);
        merged.upload = normalizeBalanceOptions(merged.upload, merged.upload);
        this.opts = merged;
    }

    private _balance(dcId: number, kind: Kind): DcBalance {
        const key = `${dcId}:${kind}`;
        let b = this._balances.get(key);
        if (!b) {
            b = new DcBalance(
                dcId,
                kind,
                kind === "download" ? this.opts.download : this.opts.upload
            );
            this._balances.set(key, b);
        }
        return b;
    }

    async getFile(
        dcId: number,
        location: Api.TypeInputFileLocation,
        offset: bigInt.BigInteger,
        limit: number,
        signal?: AbortSignal,
        onMigrate?: (newDc: number) => void
    ): Promise<Buffer> {
        const request = new Api.upload.GetFile({
            location,
            offset,
            limit,
            precise: false,
            cdnSupported: this.opts.cdnSupported,
        });
        let currentDc = dcId;
        let migrations = 0;
        const retry = this._retryState("download", currentDc);
        while (true) {
            if (signal?.aborted) throw new MediaAbortError();
            try {
                const result = await this._run(
                    currentDc,
                    "download",
                    limit,
                    request,
                    signal,
                    retry.retried || migrations > 0
                );
                if (result instanceof Api.upload.FileCdnRedirect) {
                    throw new CdnRedirectError(result);
                }
                return result.bytes;
            } catch (err: any) {
                if (err instanceof CdnRedirectError) throw err;
                if (err instanceof FileMigrateError) {
                    if (++migrations >= this.opts.requestRetries) throw err;
                    currentDc = err.newDc;
                    onMigrate?.(currentDc);
                    retry.moveTo(currentDc);
                    continue;
                }
                await sleepOrAbort(retry.check(err), signal);
            }
        }
    }

    async savePart(
        dcId: number,
        request: Api.upload.SaveFilePart | Api.upload.SaveBigFilePart,
        signal?: AbortSignal
    ): Promise<boolean> {
        const size = request.bytes.length;
        const retry = this._retryState("upload", dcId);
        while (true) {
            if (signal?.aborted) throw new MediaAbortError();
            try {
                return await this._run(
                    dcId,
                    "upload",
                    size,
                    request,
                    signal,
                    retry.retried
                );
            } catch (err: any) {
                await sleepOrAbort(retry.check(err), signal);
            }
        }
    }

    private _retryState(kind: Kind, dcId: number) {
        let balance = this._balance(dcId, kind);
        let seen = balance.completed;
        let failures = 0;
        let floods = 0;
        const limit = this.opts.requestRetries;
        return {
            get retried() {
                return failures > 0 || floods > 0;
            },
            moveTo: (newDc: number) => {
                balance = this._balance(newDc, kind);
                seen = balance.completed;
                failures = 0;
            },
            check(err: any): number {
                if (err instanceof MediaAbortError) throw err;
                if (isFlood(err)) {
                    floods++;
                    return Math.max(1, floodSeconds(err)) * 1000;
                }
                const lost = isTransportFailure(err);
                if (!lost && !isServerFailure(err)) throw err;
                if (balance.completed !== seen) {
                    seen = balance.completed;
                    failures = 0;
                }
                if (++failures >= limit) throw err;
                return lost
                    ? 0
                    : Math.min(SERVER_RETRY_CAP_MS, 1000 * 2 ** (failures - 1));
            },
        };
    }

    private async _run<R extends Api.AnyRequest>(
        dcId: number,
        kind: Kind,
        bytes: number,
        request: R,
        signal?: AbortSignal,
        priority = false
    ): Promise<R["__response"]> {
        if (this._closed) throw new Error("MediaScheduler is closed");
        const b = this._balance(dcId, kind);

        if (kind === "download") await b.pace(signal);

        let id = b.policy.pick(bytes);
        while (id < 0) {
            if (signal?.aborted) throw new MediaAbortError();
            await new Promise<void>((resolve, reject) => {
                let off: (() => void) | undefined;
                const ticket = () => {
                    off?.();
                    resolve();
                };
                if (signal) {
                    if (signal.aborted) return reject(new MediaAbortError());
                    off = onAbort(signal, (err) => {
                        const i = b.waiters.indexOf(ticket);
                        if (i >= 0) b.waiters.splice(i, 1);
                        reject(err);
                    });
                }

                if (priority) b.waiters.unshift(ticket);
                else b.waiters.push(ticket);
            });
            id = b.policy.pick(bytes);
        }

        const { wasFull } = b.policy.start(id, bytes);
        const shiftedId = b.shiftedById.get(id)!;
        const started = Date.now();
        const slot = this._network.getSession(shiftedId);
        slot.enter();
        try {
            const sender = await slot.ensureConnected().catch((err) => {
                if (err instanceof SlotRemovedError) throw err;
                this._client._log.info(
                    `${kind} session ${shiftedId} on dc ${dcId} could not connect: ${err?.message ?? err}`
                );
                slot.markDead("disconnected").catch(() => {});
                throw new SlotRemovedError("disconnected");
            });
            const result = await awaitReply(
                sender.send(request) as Promise<R["__response"]>,
                slot,
                signal
            );
            b.policy.succeed(id, bytes, wasFull, Date.now() - started);
            b.completed++;
            return result;
        } catch (err: any) {
            if (isFlood(err)) {
                this._client._log.debug(
                    `${kind} on dc ${dcId} hit ${err?.errorMessage ?? "FLOOD_WAIT"}, retrying that part in ${floodSeconds(err)}s`
                );
            }
            b.policy.release(id, bytes);
            throw err;
        } finally {
            slot.leave();
            b.wakeOne();
        }
    }

    async purge(): Promise<void> {
        this._balances.clear();
    }

    async close(): Promise<void> {
        this._closed = true;
        for (const b of this._balances.values()) b.wakeAll();
        this._balances.clear();
    }
}

const abortHooks = new WeakMap<AbortSignal, Set<(err: MediaAbortError) => void>>();

function onAbort(
    signal: AbortSignal,
    hook: (err: MediaAbortError) => void
): () => void {
    let hooks = abortHooks.get(signal);
    if (!hooks) {
        const own = new Set<(err: MediaAbortError) => void>();
        hooks = own;
        abortHooks.set(signal, own);
        signal.addEventListener(
            "abort",
            () => {
                const pending = [...own];
                own.clear();
                for (const fn of pending) fn(new MediaAbortError());
            },
            { once: true }
        );
    }
    const own = hooks;
    own.add(hook);
    return () => own.delete(hook);
}

function isFlood(err: any): boolean {
    return (
        err instanceof FloodWaitError ||
        err instanceof FloodTestPhoneWaitError ||
        err?.errorMessage?.startsWith?.("FLOOD_WAIT_") ||
        err?.errorMessage?.startsWith?.("FLOOD_PREMIUM_WAIT_")
    );
}

function isTransportFailure(err: any): boolean {
    return (
        err instanceof SlotRemovedError ||
        err?.errorMessage === "AUTH_KEY_UNREGISTERED"
    );
}

function isServerFailure(err: any): boolean {
    return (
        err instanceof ServerError ||
        err instanceof TimedOutError ||
        err?.errorMessage === "TIMEOUT" ||
        (typeof err?.code === "number" && (err.code >= 500 || err.code < 0))
    );
}

function floodSeconds(err: any): number {
    if (typeof err?.seconds === "number") return err.seconds;
    const tail = err?.errorMessage?.split?.("_")?.pop?.();
    const n = Number(tail);
    return Number.isFinite(n) && n > 0 ? n : 1;
}

async function awaitReply<T>(
    req: Promise<T>,
    slot: { onDeath: (fn: (reason: any) => void) => () => void },
    signal?: AbortSignal
): Promise<T> {
    let unsub: (() => void) | undefined;
    let off: (() => void) | undefined;
    const death = new Promise<never>((_, reject) => {
        unsub = slot.onDeath((reason) => reject(new SlotRemovedError(reason)));
    });

    const races: Promise<any>[] = [death, req];
    if (signal) {
        races.push(
            new Promise<never>((_, reject) => {
                if (signal.aborted) return reject(new MediaAbortError());
                off = onAbort(signal, reject);
            })
        );
    }
    try {
        return await Promise.race(races);
    } finally {
        unsub?.();
        off?.();
    }
}

async function sleepOrAbort(ms: number, signal?: AbortSignal): Promise<void> {
    if (ms <= 0) return;
    await new Promise<void>((resolve, reject) => {
        let off: (() => void) | undefined;
        const t = setTimeout(() => {
            off?.();
            resolve();
        }, ms);
        if (signal) {
            if (signal.aborted) {
                clearTimeout(t);
                reject(new MediaAbortError());
                return;
            }
            off = onAbort(signal, (err) => {
                clearTimeout(t);
                reject(err);
            });
        }
    });
}
