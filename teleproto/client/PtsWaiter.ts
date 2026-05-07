import type { Api } from "../tl";

export const WAIT_FOR_SKIPPED_TIMEOUT_MS = 1000;

export type SkippedTag = "update" | "updates";

export interface SkippedEntry {
    pts: number;
    tieBreaker: number;
    tag: SkippedTag;
    update?: Api.TypeUpdate;
    updates?: Api.TypeUpdates;
}

export interface PtsWaiterHost {
    onWaitForSkipped(ms: number): void;
    onWaitForShortPoll(ms: number): void;
}

export class PtsWaiter {
    private good = 0;
    private last = 0;
    private count = 0;
    private requestingFlag = false;
    private waitingForSkipped = false;
    private waitingForShortPoll = false;
    private applyingSkippedDepth = 0;
    private skippedKey = 0;

    private readonly queue: SkippedEntry[] = [];

    constructor(private readonly host: PtsWaiterHost) {}

    inited(): boolean {
        return this.good > 0;
    }

    current(): number {
        return this.good;
    }

    init(pts: number): void {
        this.good = pts;
        this.last = pts;
        this.count = pts;
        this.clearSkippedUpdates();
    }

    requesting(): boolean {
        return this.requestingFlag;
    }

    setRequesting(value: boolean): void {
        this.requestingFlag = value;
        if (value) this.clearSkippedUpdates();
    }

    isWaitingForSkipped(): boolean {
        return this.waitingForSkipped;
    }

    isWaitingForShortPoll(): boolean {
        return this.waitingForShortPoll;
    }

    setWaitingForSkipped(ms: number): void {
        if (ms >= 0) {
            this.waitingForSkipped = true;
            this.host.onWaitForSkipped(ms);
        } else {
            this.waitingForSkipped = false;
            this.checkForWaiting();
        }
    }

    setWaitingForShortPoll(ms: number): void {
        if (ms >= 0) {
            this.waitingForShortPoll = true;
            this.host.onWaitForShortPoll(ms);
        } else {
            this.waitingForShortPoll = false;
            this.checkForWaiting();
        }
    }

    updated(pts: number, count: number, payload: Omit<SkippedEntry, "pts" | "tieBreaker">): boolean {
        if (this.requestingFlag || this.applyingSkippedDepth > 0) {
            return true;
        }
        if (count > 0 && pts <= this.good) {
            return false;
        }
        if (this.check(pts, count)) {
            return true;
        }
        this.enqueue(pts, payload);
        return false;
    }

    updateAndApply(
        pts: number,
        count: number,
        payload: Omit<SkippedEntry, "pts" | "tieBreaker">,
        applyUpdate: (update: Api.TypeUpdate) => void,
        applyUpdates: (updates: Api.TypeUpdates) => void,
    ): boolean {
        if (!this.updated(pts, count, payload)) return false;
        if (!this.waitingForSkipped || this.queue.length === 0) {
            if (payload.tag === "update" && payload.update) applyUpdate(payload.update);
            else if (payload.tag === "updates" && payload.updates) applyUpdates(payload.updates);
            return true;
        }
        this.enqueue(pts, payload);
        this.applySkippedUpdates(applyUpdate, applyUpdates);
        return true;
    }

    applySkippedUpdates(
        applyUpdate: (update: Api.TypeUpdate) => void,
        applyUpdates: (updates: Api.TypeUpdates) => void,
    ): void {
        if (!this.waitingForSkipped) return;
        this.setWaitingForSkipped(-1);
        if (this.queue.length === 0) return;

        this.applyingSkippedDepth++;
        try {
            for (const entry of this.queue) {
                if (entry.tag === "update" && entry.update) applyUpdate(entry.update);
                else if (entry.tag === "updates" && entry.updates) applyUpdates(entry.updates);
            }
        } finally {
            this.applyingSkippedDepth--;
            this.clearSkippedUpdates();
        }
    }

    clearSkippedUpdates(): void {
        this.queue.length = 0;
    }

    private check(pts: number, count: number): boolean {
        if (!this.inited()) {
            this.init(pts);
            return true;
        }
        this.last = Math.max(this.last, pts);
        this.count += count;
        if (this.last === this.count) {
            this.good = this.last;
            return true;
        }
        if (this.last < this.count) {
            this.setWaitingForSkipped(1);
            return false;
        }
        this.setWaitingForSkipped(WAIT_FOR_SKIPPED_TIMEOUT_MS);
        return false;
    }

    private enqueue(pts: number, payload: Omit<SkippedEntry, "pts" | "tieBreaker">): void {
        const entry: SkippedEntry = {
            pts,
            tieBreaker: ++this.skippedKey,
            ...payload,
        };
        const idx = this.lowerBoundOf(entry);
        this.queue.splice(idx, 0, entry);
    }

    private lowerBoundOf(entry: SkippedEntry): number {
        let lo = 0;
        let hi = this.queue.length;
        while (lo < hi) {
            const mid = (lo + hi) >>> 1;
            const cur = this.queue[mid]!;
            const lt =
                cur.pts < entry.pts ||
                (cur.pts === entry.pts && cur.tieBreaker < entry.tieBreaker);
            if (lt) lo = mid + 1;
            else hi = mid;
        }
        return lo;
    }

    private checkForWaiting(): void {
        if (!this.waitingForSkipped && !this.waitingForShortPoll) {
            this.host.onWaitForSkipped(-1);
        }
    }
}
