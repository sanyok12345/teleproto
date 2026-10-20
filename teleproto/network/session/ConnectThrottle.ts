type Limit = readonly [durationS: number, count: number];

const SANITY: Limit[] = [[5, 10]];
const OFFLINE: Limit[] = [[1, 1], [4, 2], [8, 3]];
const ONLINE: Limit[] = [[1, 4], [5, 5]];
const TRANSPORT_FLOOD: Limit[] = [[1, 1], [4, 2], [8, 3]];
const MAX_BACKOFF_S = 16;

class StrictFloodControl {
    private events: number[] = [];

    constructor(private readonly limits: Limit[]) {}

    wakeupAt(): number {
        let at = 0;
        for (const [duration, count] of this.limits) {
            if (this.events.length >= count) at = Math.max(at, this.events[this.events.length - count] + duration * 1000);
        }
        return at;
    }

    add(now: number) {
        this.events.push(now);
        const keep = Math.max(...this.limits.map(([, count]) => count));
        if (this.events.length > keep) this.events.splice(0, this.events.length - keep);
    }

    clear() {
        this.events = [];
    }
}

export class ConnectThrottle {
    private readonly sanity = new StrictFloodControl(SANITY);
    private readonly offline = new StrictFloodControl(OFFLINE);
    private readonly online = new StrictFloodControl(ONLINE);
    private readonly transportFlood = new StrictFloodControl(TRANSPORT_FLOOD);
    private backoffAt = 0;
    private backoffDelayS = 1;

    constructor(private readonly isOnline: () => boolean = () => true) {}

    nextAttemptAt(): number {
        const online = this.isOnline();
        let at = Math.max(
            this.sanity.wakeupAt(),
            this.transportFlood.wakeupAt(),
            (online ? this.online : this.offline).wakeupAt()
        );
        if (!online) at = Math.max(at, this.backoffAt);
        return at;
    }

    attempt(now = Date.now()) {
        this.sanity.add(now);
        (this.isOnline() ? this.online : this.offline).add(now);
        if (!this.isOnline()) {
            this.backoffAt = now + this.backoffDelayS * 1000;
            this.backoffDelayS = Math.min(MAX_BACKOFF_S, this.backoffDelayS * 2);
        }
    }

    transportFlooded(now = Date.now()) {
        this.transportFlood.add(now);
    }

    connected() {
        this.backoffAt = 0;
        this.backoffDelayS = 1;
    }

    networkChanged() {
        this.connected();
        this.sanity.clear();
        this.offline.clear();
        this.online.clear();
        this.transportFlood.clear();
    }
}
