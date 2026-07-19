export interface BalancePolicyOptions {

    partSize: number;

    startWindow: number;

    maxWindow: number;

    startSessions: number;

    maxSessions: number;

    slowRequestMs: number;

    removeAfterTimeouts: number;

    addSessionGateMs: number;
}

export const DOWNLOAD_BALANCE: BalancePolicyOptions = {
    partSize: 512 * 1024,
    startWindow: 2 * 1024 * 1024,
    maxWindow: 4 * 1024 * 1024,
    startSessions: 2,
    maxSessions: 8,
    slowRequestMs: 8000,
    removeAfterTimeouts: 4,
    addSessionGateMs: 2000,
};

export const UPLOAD_BALANCE: BalancePolicyOptions = {
    partSize: 512 * 1024,

    startWindow: 2 * 1024 * 1024,
    maxWindow: 2 * 1024 * 1024,
    startSessions: 4,
    maxSessions: 8,
    slowRequestMs: 8000,
    removeAfterTimeouts: 4,
    addSessionGateMs: 2000,

};

interface SessionBalance {

    id: number;

    requested: number;

    window: number;

    timeouts: number;
}

export class BalancePolicy {
    readonly opts: BalancePolicyOptions;
    private readonly _now: () => number;
    private readonly _sessions: SessionBalance[] = [];
    private _removeTimes = 0;
    private _lastAddAt: number;
    private _nextId = 0;

    constructor(opts: BalancePolicyOptions, now: () => number = Date.now) {
        this.opts = opts;
        this._now = now;

        this._lastAddAt = now();
        const count = Math.max(1, opts.startSessions || 1);
        for (let i = 0; i < count; i++) {
            this._sessions.push(this._fresh());
        }
    }

    private _fresh(): SessionBalance {
        return {
            id: this._nextId++,
            requested: 0,
            window: this.opts.startWindow,
            timeouts: 0,
        };
    }

    private _byId(id: number): SessionBalance | undefined {
        return this._sessions.find((s) => s.id === id);
    }

    get sessionCount(): number {
        return this._sessions.length;
    }

    get sessionIds(): number[] {
        return this._sessions.map((s) => s.id);
    }

    pick(bytes: number): number {
        let best = -1;
        let bestLoad = Infinity;
        for (const s of this._sessions) {
            if (s.requested + bytes <= s.window && s.requested < bestLoad) {
                best = s.id;
                bestLoad = s.requested;
            }
        }
        return best;
    }

    start(id: number, bytes: number): { wasFull: boolean } {
        const s = this._byId(id);
        if (!s) return { wasFull: false };
        s.requested += bytes;
        return { wasFull: s.requested >= s.window };
    }

    succeed(
        id: number,
        bytes: number,
        wasFull: boolean,
        durationMs: number
    ): { addedSession: boolean; addedId: number } {
        const s = this._byId(id);
        if (s) {
            s.requested = Math.max(0, s.requested - bytes);
            s.timeouts = 0;
        }
        if (durationMs >= this.opts.slowRequestMs) {

            this._slow(id);
            return { addedSession: false, addedId: -1 };
        }
        if (!s || !wasFull) return { addedSession: false, addedId: -1 };

        const now = this._now();
        if (s.window < this.opts.maxWindow) {

            s.window = Math.min(
                s.window + this.opts.partSize,
                this.opts.maxWindow
            );
            return { addedSession: false, addedId: -1 };
        }

        const gate = this.opts.addSessionGateMs * (this._removeTimes + 1);
        if (
            this._sessions.length < this.opts.maxSessions &&
            now - this._lastAddAt >= gate
        ) {
            const fresh = this._fresh();
            this._sessions.push(fresh);
            this._lastAddAt = now;
            return { addedSession: true, addedId: fresh.id };
        }
        return { addedSession: false, addedId: -1 };
    }

    fail(id: number, bytes: number): { removedId: number } {
        const s = this._byId(id);
        if (s) s.requested = Math.max(0, s.requested - bytes);
        return this._slow(id);
    }

    private _slow(id: number): { removedId: number } {
        const s = this._byId(id);
        if (!s) return { removedId: -1 };
        s.timeouts++;
        if (
            s.timeouts >= this.opts.removeAfterTimeouts &&
            this._sessions.length > 1
        ) {
            this._sessions.splice(this._sessions.indexOf(s), 1);
            this._removeTimes++;
            return { removedId: id };
        }
        return { removedId: -1 };
    }

    remove(id: number): boolean {
        const s = this._byId(id);
        if (!s || this._sessions.length <= 1) return false;
        this._sessions.splice(this._sessions.indexOf(s), 1);

        this._removeTimes++;
        return true;
    }

    release(id: number, bytes: number): void {
        const s = this._byId(id);
        if (s) s.requested = Math.max(0, s.requested - bytes);
    }

    get totalRequested(): number {
        return this._sessions.reduce((a, s) => a + s.requested, 0);
    }
}
