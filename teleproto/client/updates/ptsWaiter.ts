import type { Api } from "../../tl";

export const WAIT_FOR_SKIPPED_TIMEOUT_MS = 500;

export type SkippedTag = "update" | "updates";

export interface SkippedEntry {
    pts: number;
    count: number;
    tieBreaker: number;
    tag: SkippedTag;
    update?: Api.TypeUpdate;
    updates?: Api.TypeUpdates;
    applyUpdate?: (update: Api.TypeUpdate) => void;
    applyUpdates?: (updates: Api.TypeUpdates) => void;
}

type Payload = Omit<SkippedEntry, "pts" | "count" | "tieBreaker">;

export interface PtsWaiterHost {
    onWaitForSkipped(ms: number): void;
    onWaitForShortPoll(ms: number): void;
    onApplied?(pts: number): void;
}

export class PtsWaiter {
    private good = 0;
    private initialized = false;
    private requestingFlag = false;
    private waitingForSkipped = false;
    private waitingForShortPoll = false;
    private skippedKey = 0;
    private readonly queue: SkippedEntry[] = [];

    constructor(private readonly host: PtsWaiterHost) { }

    inited(): boolean { return this.initialized; }
    current(): number { return this.good; }

    init(pts: number, preservePending = false): void {
        this.good = pts;
        this.initialized = true;
        if (!preservePending) this.clearSkippedUpdates();
    }

    requesting(): boolean { return this.requestingFlag; }

    setRequesting(value: boolean): void {
        this.requestingFlag = value;
        if (value) this.setWaitingForSkipped(-1);
        else this.applySkippedUpdates();
    }

    isWaitingForSkipped(): boolean { return this.waitingForSkipped; }
    isWaitingForShortPoll(): boolean { return this.waitingForShortPoll; }

    setWaitingForSkipped(ms: number): void {
        this.waitingForSkipped = ms >= 0;
        if (ms >= 0 || !this.waitingForShortPoll) this.host.onWaitForSkipped(ms);
    }

    setWaitingForShortPoll(ms: number): void {
        this.waitingForShortPoll = ms >= 0;
        if (ms >= 0) this.host.onWaitForShortPoll(ms);
        else if (!this.waitingForSkipped) this.host.onWaitForSkipped(-1);
    }

    updated(pts: number, count: number, payload: Payload): boolean {
        if (!Number.isSafeInteger(pts) || !Number.isSafeInteger(count) || pts < 0 || count < 0) {
            this.setWaitingForSkipped(1);
            return false;
        }
        if (!this.initialized) this.init(Math.max(0, pts - count));
        if (pts < this.good || (count > 0 && pts === this.good)) return false;
        if (!this.requestingFlag && this.good + count === pts) {
            this.good = pts;
            return true;
        }
        if (count > 0 && this.queue.some((entry) => entry.pts === pts && entry.count === count)) return false;
        this.queue.push({ pts, count, tieBreaker: ++this.skippedKey, ...payload });
        this.queue.sort((a, b) => a.pts - b.pts || b.count - a.count || a.tieBreaker - b.tieBreaker);
        if (!this.requestingFlag) this.setWaitingForSkipped(this.good + count > pts ? 1 : WAIT_FOR_SKIPPED_TIMEOUT_MS);
        return false;
    }

    updateAndApply(
        pts: number,
        count: number,
        payload: Payload,
        applyUpdate: (update: Api.TypeUpdate) => void,
        applyUpdates: (updates: Api.TypeUpdates) => void,
    ): boolean {
        const entry = { ...payload, applyUpdate, applyUpdates };
        if (!this.updated(pts, count, entry)) return false;
        this.apply(entry);
        this.applySkippedUpdates(applyUpdate, applyUpdates);
        return true;
    }

    applySkippedUpdates(
        applyUpdate?: (update: Api.TypeUpdate) => void,
        applyUpdates?: (updates: Api.TypeUpdates) => void,
    ): void {
        if (this.requestingFlag) return;
        while (this.queue.length) {
            const entry = this.queue[0];
            if (entry.pts < this.good || (entry.count > 0 && entry.pts === this.good)) {
                this.queue.shift();
                continue;
            }
            if (this.good + entry.count !== entry.pts) break;
            this.queue.shift();
            this.good = entry.pts;
            this.apply({ ...entry, applyUpdate: entry.applyUpdate ?? applyUpdate, applyUpdates: entry.applyUpdates ?? applyUpdates });
        }
        this.setWaitingForSkipped(this.queue.length ? WAIT_FOR_SKIPPED_TIMEOUT_MS : -1);
    }

    clearSkippedUpdates(): void {
        this.queue.length = 0;
        this.setWaitingForSkipped(-1);
    }

    private apply(entry: Payload): void {
        this.host.onApplied?.(this.good);
        if (entry.tag === "update" && entry.update) entry.applyUpdate?.(entry.update);
        else if (entry.tag === "updates" && entry.updates) entry.applyUpdates?.(entry.updates);
    }
}
