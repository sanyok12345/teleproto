export interface BalancePolicyOptions {
    partSize: number;
    sessions: number;
    inFlight: number;
    startWindow?: number;
    maxWindow?: number;
    startSessions?: number;
    maxSessions?: number;
    slowRequestMs?: number;
    removeAfterTimeouts?: number;
    addSessionGateMs?: number;
}

export const DOWNLOAD_BALANCE: BalancePolicyOptions = {
    partSize: 512 * 1024,
    sessions: 4,
    inFlight: 4,
};

export const UPLOAD_BALANCE: BalancePolicyOptions = {
    partSize: 512 * 1024,
    sessions: 8,
    inFlight: 2,
};

export function normalizeBalanceOptions(
    opts: Partial<BalancePolicyOptions>,
    base: BalancePolicyOptions
): BalancePolicyOptions {
    const partSize = opts.partSize && opts.partSize > 0 ? opts.partSize : base.partSize;
    const sessions = Math.max(
        1,
        opts.sessions ?? opts.startSessions ?? base.sessions
    );
    const inFlight = Math.max(
        1,
        opts.inFlight ??
        (opts.startWindow && opts.startWindow > 0
            ? Math.round(opts.startWindow / partSize)
            : base.inFlight)
    );
    return { ...base, ...opts, partSize, sessions, inFlight };
}

interface SessionLoad {
    id: number;
    requested: number;
}

export class BalancePolicy {
    readonly opts: BalancePolicyOptions;
    private readonly _sessions: SessionLoad[] = [];
    private readonly _window: number;
    private _nextId = 0;

    constructor(opts: BalancePolicyOptions, _now: () => number = Date.now) {
        this.opts = normalizeBalanceOptions(opts, opts);
        this._window = this.opts.inFlight * this.opts.partSize;
        for (let i = 0; i < this.opts.sessions; i++) {
            this._sessions.push(this._fresh());
        }
    }

    private _fresh(): SessionLoad {
        return { id: this._nextId++, requested: 0 };
    }

    private _byId(id: number): SessionLoad | undefined {
        return this._sessions.find((s) => s.id === id);
    }

    get sessionCount(): number {
        return this._sessions.length;
    }

    get sessionIds(): number[] {
        return this._sessions.map((s) => s.id);
    }

    get window(): number {
        return this._window;
    }

    pick(bytes: number): number {
        let best = -1;
        let bestLoad = Infinity;
        for (const s of this._sessions) {
            const fits = s.requested === 0 || s.requested + bytes <= this._window;
            if (fits && s.requested < bestLoad) {
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
        return { wasFull: s.requested >= this._window };
    }

    succeed(
        id: number,
        bytes: number,
        _wasFull = false,
        _durationMs = 0
    ): { addedSession: boolean; addedId: number } {
        this.release(id, bytes);
        return { addedSession: false, addedId: -1 };
    }

    fail(id: number, bytes: number): { removedId: number } {
        this.release(id, bytes);
        return { removedId: -1 };
    }

    replace(id: number): number {
        const s = this._byId(id);
        if (!s) return -1;
        const fresh = this._fresh();
        this._sessions.splice(this._sessions.indexOf(s), 1, fresh);
        return fresh.id;
    }

    remove(id: number): boolean {
        return this.replace(id) >= 0;
    }

    release(id: number, bytes: number): void {
        const s = this._byId(id);
        if (s) s.requested = Math.max(0, s.requested - bytes);
    }

    get totalRequested(): number {
        return this._sessions.reduce((a, s) => a + s.requested, 0);
    }
}
