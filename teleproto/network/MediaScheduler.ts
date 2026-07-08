import bigInt from "big-integer";
import { Api } from "../tl";
import { Network } from "./Network";
import {
    BalancePolicy,
    BalancePolicyOptions,
    DOWNLOAD_BALANCE,
    UPLOAD_BALANCE,
} from "./BalancePolicy";
import { downloadDcId, uploadDcId, ShiftedDcId } from "./core_types";
import { SlotRemovedError } from "./SenderSlot";
import {
    FileMigrateError,
    FloodWaitError,
    FloodTestPhoneWaitError,
} from "../errors";
import type { TelegramBaseClient } from "../client/telegramBaseClient";

const ONE_MB = 1024 * 1024;
const MIN_CHUNK = 4096;

const REQUEST_DEADLINE_MS = 15_000;

export interface MediaSchedulerOptions {

    partSize: number;

    requestRetries: number;

    cdnSupported: boolean;

    download: BalancePolicyOptions;

    upload: BalancePolicyOptions;
}

export const DEFAULT_MEDIA_SCHEDULER_OPTIONS: MediaSchedulerOptions = {
    partSize: 512 * 1024,
    requestRetries: 5,
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
    floodWaitUntil = 0;
    private _nextSlot = 1;

    constructor(
        readonly dcId: number,
        readonly kind: Kind,
        opts: BalancePolicyOptions
    ) {
        this.policy = new BalancePolicy(opts);
        this.shiftedById.set(0, this._shifted(0));
    }

    private _shifted(i: number): ShiftedDcId {
        return this.kind === "download"
            ? downloadDcId(this.dcId, i)
            : uploadDcId(this.dcId, i);
    }

    grow(id: number): void {
        this.shiftedById.set(id, this._shifted(this._nextSlot++ % 16));
    }

    drop(id: number): ShiftedDcId | undefined {
        const shifted = this.shiftedById.get(id);
        this.shiftedById.delete(id);
        return shifted;
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
                const w = opts.inflightPerDc * merged.partSize;
                merged.download.startWindow = w;
                merged.download.maxWindow = Math.max(
                    merged.download.maxWindow,
                    w
                );
                merged.upload.startWindow = w;
                merged.upload.maxWindow = Math.max(merged.upload.maxWindow, w);
            }
            if (opts.maxSessions && opts.maxSessions > 0) {
                merged.download.maxSessions = opts.maxSessions;
                merged.upload.maxSessions = opts.maxSessions;
            }
            if ((opts as any).download) {
                Object.assign(merged.download, (opts as any).download);
            }
            if ((opts as any).upload) {
                Object.assign(merged.upload, (opts as any).upload);
            }
        }
        if (merged.partSize > ONE_MB) merged.partSize = ONE_MB;
        if (merged.partSize % MIN_CHUNK !== 0) {
            throw new Error("partSize must be a multiple of 4096");
        }
        merged.download.partSize = merged.partSize;
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
        signal?: AbortSignal
    ): Promise<Buffer> {
        const request = new Api.upload.GetFile({
            location,
            offset,
            limit,
            precise: false,
            cdnSupported: this.opts.cdnSupported,
        });
        let currentDc = dcId;
        let lastErr: any;
        for (let attempt = 0; attempt < this.opts.requestRetries; attempt++) {
            if (signal?.aborted) throw new MediaAbortError();
            try {
                const result = await this._run(
                    currentDc,
                    "download",
                    limit,
                    request,
                    signal,
                    attempt > 0
                );
                if (result instanceof Api.upload.FileCdnRedirect) {
                    throw new CdnRedirectError(result);
                }
                return result.bytes;
            } catch (err: any) {
                lastErr = err;
                if (err instanceof MediaAbortError) throw err;
                if (err instanceof CdnRedirectError) throw err;
                if (err instanceof SlotRemovedError) continue;
                if (err instanceof FileMigrateError) {
                    currentDc = err.newDc;
                    continue;
                }
                if (isFlood(err)) continue;
                if (err?.errorMessage === "TIMEOUT") continue;
                throw err;
            }
        }
        throw lastErr ?? new Error("MediaScheduler retries exhausted");
    }

    async savePart(
        dcId: number,
        request: Api.upload.SaveFilePart | Api.upload.SaveBigFilePart,
        signal?: AbortSignal
    ): Promise<boolean> {
        const size = request.bytes.length;
        let lastErr: any;
        for (let attempt = 0; attempt < this.opts.requestRetries; attempt++) {
            if (signal?.aborted) throw new MediaAbortError();
            try {
                return await this._run(
                    dcId,
                    "upload",
                    size,
                    request,
                    signal,
                    attempt > 0
                );
            } catch (err: any) {
                lastErr = err;
                if (err instanceof MediaAbortError) throw err;
                if (err instanceof SlotRemovedError) continue;
                if (isFlood(err)) continue;
                if (err?.errorMessage === "TIMEOUT") continue;
                throw err;
            }
        }
        throw lastErr ?? new Error("MediaScheduler retries exhausted");
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

        while (true) {
            if (signal?.aborted) throw new MediaAbortError();
            const wait = b.floodWaitUntil - Date.now();
            if (wait <= 0) break;
            await sleepOrAbort(Math.min(wait, 1000), signal);
        }

        let id = b.policy.pick(bytes);
        while (id < 0) {
            if (signal?.aborted) throw new MediaAbortError();
            await new Promise<void>((resolve, reject) => {
                const onAbort = () => {
                    const i = b.waiters.indexOf(ticket);
                    if (i >= 0) b.waiters.splice(i, 1);
                    reject(new MediaAbortError());
                };
                const ticket = () => {
                    signal?.removeEventListener("abort", onAbort);
                    resolve();
                };
                if (signal) {
                    if (signal.aborted) return reject(new MediaAbortError());
                    signal.addEventListener("abort", onAbort, { once: true });
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

            const result = await withTimeout(
                (async () => {
                    const sender = await slot.ensureConnected();

                    return raceWithSlotDeath(
                        sender.send(request) as Promise<R["__response"]>,
                        slot,
                        signal
                    );
                })(),
                REQUEST_DEADLINE_MS
            );
            const { addedSession, addedId } = b.policy.succeed(
                id,
                bytes,
                wasFull,
                Date.now() - started
            );
            if (addedSession) b.grow(addedId);
            return result;
        } catch (err: any) {
            if (isFlood(err)) {

                b.floodWaitUntil =
                    Date.now() + Math.max(1, floodSeconds(err)) * 1000;
                b.policy.release(id, bytes);
            } else {
                const { removedId } = b.policy.fail(id, bytes);
                let removed = removedId;
                if (removed < 0 && err instanceof SlotRemovedError) {

                    removed = b.policy.remove(id) ? id : -1;
                }
                if (removed >= 0) {
                    const dropped = b.drop(removed);
                    if (dropped !== undefined) {
                        this._network.removeSession(dropped);
                    }
                    if (removed === id) {

                        this._network.removeSession(shiftedId);
                    }
                }
            }
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

function isFlood(err: any): boolean {
    return (
        err instanceof FloodWaitError ||
        err instanceof FloodTestPhoneWaitError ||
        err?.errorMessage?.startsWith?.("FLOOD_WAIT_") ||
        err?.errorMessage?.startsWith?.("FLOOD_PREMIUM_WAIT_")
    );
}

function floodSeconds(err: any): number {
    if (typeof err?.seconds === "number") return err.seconds;
    const tail = err?.errorMessage?.split?.("_")?.pop?.();
    const n = Number(tail);
    return Number.isFinite(n) && n > 0 ? n : 1;
}

async function raceWithSlotDeath<T>(
    req: Promise<T>,
    slot: { onDeath: (fn: (reason: any) => void) => () => void },
    signal?: AbortSignal
): Promise<T> {
    let unsub: (() => void) | undefined;
    let onAbort: (() => void) | undefined;
    const death = new Promise<never>((_, reject) => {
        unsub = slot.onDeath((reason) => reject(new SlotRemovedError(reason)));
    });
    const races: Promise<any>[] = [req, death];
    if (signal) {
        races.push(
            new Promise<never>((_, reject) => {
                if (signal.aborted) return reject(new MediaAbortError());
                onAbort = () => reject(new MediaAbortError());
                signal.addEventListener("abort", onAbort, { once: true });
            })
        );
    }
    try {
        return await Promise.race(races);
    } finally {
        unsub?.();
        if (signal && onAbort) signal.removeEventListener("abort", onAbort);
    }
}

class RequestTimeoutError extends Error {

    errorMessage = "TIMEOUT";
    constructor() {
        super("Media request deadline exceeded");
        this.name = "RequestTimeoutError";
    }
}

function withTimeout<T>(p: Promise<T>, ms: number): Promise<T> {
    return new Promise<T>((resolve, reject) => {
        const t = setTimeout(() => reject(new RequestTimeoutError()), ms);
        p.then(
            (v) => {
                clearTimeout(t);
                resolve(v);
            },
            (e) => {
                clearTimeout(t);
                reject(e);
            }
        );
    });
}

async function sleepOrAbort(ms: number, signal?: AbortSignal): Promise<void> {
    await new Promise<void>((resolve, reject) => {
        let onAbort: (() => void) | undefined;
        const t = setTimeout(() => {
            if (signal && onAbort) signal.removeEventListener("abort", onAbort);
            resolve();
        }, ms);
        onAbort = () => {
            clearTimeout(t);
            reject(new MediaAbortError());
        };
        if (signal) {
            if (signal.aborted) {
                clearTimeout(t);
                reject(new MediaAbortError());
                return;
            }
            signal.addEventListener("abort", onAbort, { once: true });
        }
    });
}
