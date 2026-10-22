import type { Api } from "../../tl";

export const WAIT_FOR_SKIPPED_TIMEOUT_MS = 700;
export const SINGLE_GAP_REPAIR_MS = 50;
const GAP_TIMEOUT_UPDATE_COUNT = 20;

export type SkippedTag = "update" | "updates";

export interface SkippedEntry {
    pts: number;
    count: number;
    receivedAt: number;
    tieBreaker: number;
    tag: SkippedTag;
    update?: Api.TypeUpdate;
    updates?: Api.TypeUpdates;
    applyUpdate?: (update: Api.TypeUpdate) => void;
    applyUpdates?: (updates: Api.TypeUpdates) => void;
}

type Payload = Omit<SkippedEntry, "pts" | "count" | "tieBreaker" | "receivedAt">;

export interface PtsWaiterHost {
    onWaitForSkipped(ms: number): void;
    onSingleGap?(): void;
    onApplied?(pts: number): void;
}

export class PtsWaiter {
    private good = 0;
    private initialized = false;
    private requestingFlag = false;
    private skippedKey = 0;
    private readonly queue: SkippedEntry[] = [];

    constructor(private readonly host: PtsWaiterHost) {}

    inited(): boolean {
        return this.initialized;
    }

    current(): number {
        return this.good;
    }

    get pendingCount(): number {
        return this.queue.length;
    }

    init(pts: number, preservePending = false): void {
        this.good = pts;
        this.initialized = true;
        if (!preservePending) this.clearSkippedUpdates();
    }

    requesting(): boolean {
        return this.requestingFlag;
    }

    setRequesting(value: boolean): void {
        this.requestingFlag = value;
        if (value) this.host.onWaitForSkipped(-1);
        else this.applySkippedUpdates();
    }

    updated(pts: number, count: number, payload: Payload): boolean {
        if (!Number.isSafeInteger(pts) || !Number.isSafeInteger(count) || pts < 0 || count < 0) return false;
        if (!this.initialized) this.init(Math.max(0, pts - count));
        if (pts < this.good || (count > 0 && pts === this.good)) return false;
        if (!this.requestingFlag && this.good + count === pts) {
            this.good = pts;
            return true;
        }
        if (count > 0 && this.queue.some((entry) => entry.pts === pts && entry.count === count)) return false;
        this.queue.push({ pts, count, receivedAt: Date.now(), tieBreaker: ++this.skippedKey, ...payload });
        this.queue.sort((a, b) => a.pts - b.pts || b.count - a.count || a.tieBreaker - b.tieBreaker);
        if (!this.requestingFlag) {
            if (this.good + count > pts) this.host.onWaitForSkipped(1);
            else this.armGap();
        }
        return false;
    }

    updateAndApply(
        pts: number,
        count: number,
        payload: Payload,
        applyUpdate: (update: Api.TypeUpdate) => void,
        applyUpdates: (updates: Api.TypeUpdates) => void
    ): boolean {
        const entry = { ...payload, applyUpdate, applyUpdates };
        if (!this.updated(pts, count, entry)) return false;
        this.apply(entry);
        this.applySkippedUpdates(applyUpdate, applyUpdates);
        return true;
    }

    applySkippedUpdates(
        applyUpdate?: (update: Api.TypeUpdate) => void,
        applyUpdates?: (updates: Api.TypeUpdates) => void
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
            this.apply({
                ...entry,
                applyUpdate: entry.applyUpdate ?? applyUpdate,
                applyUpdates: entry.applyUpdates ?? applyUpdates,
            });
        }
        if (this.queue.length) this.armGap();
        else this.host.onWaitForSkipped(-1);
    }

    clearSkippedUpdates(): void {
        this.queue.length = 0;
        this.host.onWaitForSkipped(-1);
    }

    private armGap() {
        let firstReceivedAt = Infinity;
        for (const entry of this.queue.slice(0, GAP_TIMEOUT_UPDATE_COUNT)) {
            firstReceivedAt = Math.min(firstReceivedAt, entry.receivedAt);
        }
        this.host.onWaitForSkipped(Math.max(0, firstReceivedAt + WAIT_FOR_SKIPPED_TIMEOUT_MS - Date.now()));
        const first = this.queue[0];
        if (first && first.pts - first.count === this.good + 1) this.host.onSingleGap?.();
    }

    private apply(entry: Payload): void {
        this.host.onApplied?.(this.good);
        if (entry.tag === "update" && entry.update) entry.applyUpdate?.(entry.update);
        else if (entry.tag === "updates" && entry.updates) entry.applyUpdates?.(entry.updates);
    }
}
