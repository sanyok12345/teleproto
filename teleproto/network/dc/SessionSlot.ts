import type { Session } from "../session/Session";

export type SenderSlotState = "idle" | "connecting" | "ready" | "dead";

export type SenderSlotDeathReason = "auth-broken" | "disconnected" | "manual" | "pool-closed";

export interface SenderSlotOptions {
    dcId: number;
    idleTimeoutMs: number;
    connect: (slot: SessionSlot) => Promise<Session>;
}

export class SlotRemovedError extends Error {
    constructor(readonly reason: SenderSlotDeathReason) {
        super(`sender slot removed: ${reason}`);
        this.name = "SlotRemovedError";
    }
}

export class SessionSlot {
    readonly dcId: number;
    private dead?: SenderSlotDeathReason;
    private session?: Session;
    private connecting?: Promise<Session>;
    private idleTimer?: ReturnType<typeof setTimeout>;
    private readonly deathListeners = new Set<(reason: SenderSlotDeathReason) => void>();
    private active = 0;

    constructor(private readonly opts: SenderSlotOptions) {
        this.dcId = opts.dcId;
    }

    get state(): SenderSlotState {
        if (this.dead) return "dead";
        if (this.session?.isConnected()) return "ready";
        if (this.connecting || this.session?.isReconnecting) return "connecting";
        return "idle";
    }

    get load(): number {
        return this.active;
    }

    get sender(): Session | undefined {
        return this.session;
    }

    ensureConnected(): Promise<Session> {
        if (this.dead) return Promise.reject(new SlotRemovedError(this.dead));
        if (this.session && !this.session.userDisconnected) return Promise.resolve(this.session);
        this.connecting ??= this.open().finally(() => {
            this.connecting = undefined;
        });
        return this.connecting;
    }

    private async open(): Promise<Session> {
        this.clearIdle();
        let session: Session;
        try {
            session = await this.opts.connect(this);
        } catch (error) {
            if (this.dead && !(error instanceof SlotRemovedError)) throw new SlotRemovedError(this.dead);
            throw error;
        }
        if (this.dead) {
            await session.disconnect().catch(() => { });
            throw new SlotRemovedError(this.dead);
        }
        this.session = session;
        if (this.active === 0) this.armIdle();
        return session;
    }

    enter() {
        this.active++;
        this.clearIdle();
    }

    leave() {
        if (this.active > 0) this.active--;
        if (this.active === 0 && this.session) this.armIdle();
    }

    onDeath(listener: (reason: SenderSlotDeathReason) => void): () => void {
        if (this.dead) {
            listener(this.dead);
            return () => { };
        }
        this.deathListeners.add(listener);
        return () => this.deathListeners.delete(listener);
    }

    async markDead(reason: SenderSlotDeathReason): Promise<void> {
        if (this.dead) return;
        this.dead = reason;
        this.clearIdle();
        for (const listener of this.deathListeners) {
            try {
                listener(reason);
            } catch { }
        }
        this.deathListeners.clear();
        const session = this.session;
        this.session = undefined;
        await session?.disconnect().catch(() => { });
    }

    private clearIdle() {
        clearTimeout(this.idleTimer);
        this.idleTimer = undefined;
    }

    private armIdle() {
        this.clearIdle();
        if (this.dead || this.opts.idleTimeoutMs <= 0) return;
        this.idleTimer = setTimeout(() => this.idle(), this.opts.idleTimeoutMs);
        this.idleTimer.unref?.();
    }

    private idle() {
        this.idleTimer = undefined;
        const session = this.session;
        if (this.dead || this.active > 0 || !session) return;
        if (session.hasPendingWork || session.isReconnecting) return this.armIdle();
        this.session = undefined;
        session.disconnect().catch(() => { });
    }
}
