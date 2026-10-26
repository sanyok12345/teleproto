import { timers } from "../../platform";
import { AuthKey } from "../../crypto/AuthKey";
import type { TelegramBaseClient } from "../../client/TelegramBaseClient";
import { tempKeyLifetime } from "../mtproto/tempKeyBinding";
import type { ConnectionBreakReason, Session } from "../session/Session";
import type { DcState } from "./DcState";
import { SessionSlot } from "./SessionSlot";
import { bareDcId, isDownloadDcId, isDownloadSmallDcId, isMediaDcId, type ShiftedDcId } from "./dcId";

export interface NetworkOptions {
    idleTimeoutMs: number;
    sessionStartupDelayMs: number;
}

export interface SessionLease {
    sender: Session;
    release: () => void;
}

export class SessionPool {
    private readonly slots = new Map<ShiftedDcId, SessionSlot>();
    private readonly keyCreation = new Map<number, Promise<unknown>>();
    private readonly lastStartAt = new Map<ShiftedDcId, number>();
    private closed = false;

    constructor(
        private readonly client: TelegramBaseClient,
        private readonly opts: NetworkOptions
    ) { }

    dcenter(dcId: number): DcState {
        return this.client._dcenters.get(dcId, this.client.session.getAuthKey(dcId));
    }

    getSession(shiftedDcId: ShiftedDcId): SessionSlot {
        if (this.closed) throw new Error("Network is closed");
        let slot = this.slots.get(shiftedDcId);
        if (!slot || slot.state === "dead") {
            slot = this.createSlot(shiftedDcId);
            this.slots.set(shiftedDcId, slot);
        }
        return slot;
    }

    async lease(dcId: ShiftedDcId): Promise<SessionLease> {
        const slot = this.getSession(dcId);
        const sender = await slot.ensureConnected();
        slot.enter();
        let released = false;
        return {
            sender,
            release: () => {
                if (released) return;
                released = true;
                slot.leave();
            },
        };
    }

    removeSession(shiftedDcId: ShiftedDcId) {
        const slot = this.slots.get(shiftedDcId);
        if (!slot) return;
        this.slots.delete(shiftedDcId);
        slot.markDead("manual").catch(() => { });
    }

    async purge() {
        await this.retire("manual");
    }

    async close() {
        this.closed = true;
        await this.retire("pool-closed");
    }

    private async retire(reason: "manual" | "pool-closed") {
        const slots = [...this.slots.values()];
        this.slots.clear();
        await Promise.all(slots.map((slot) => slot.markDead(reason).catch(() => { })));
    }

    private createSlot(shiftedDcId: ShiftedDcId): SessionSlot {
        const dcId = bareDcId(shiftedDcId);
        const dc = this.dcenter(dcId);
        const slot: SessionSlot = new SessionSlot({
            dcId,
            idleTimeoutMs: this.opts.idleTimeoutMs,
            connect: () => {
                if (this.hasKey(dc)) return this.start(shiftedDcId, slot, dc);
                const previous = this.keyCreation.get(dcId) ?? Promise.resolve();
                const ours = previous.then(() => this.start(shiftedDcId, slot, dc));
                this.keyCreation.set(dcId, ours.catch(() => { }));
                return ours;
            },
        });
        return slot;
    }

    private hasKey(dc: DcState) {
        return !!dc.authKey.getKey() || !!this.client.session.getAuthKey(dc.dcId)?.getKey();
    }

    private async start(shiftedDcId: ShiftedDcId, slot: SessionSlot, dc: DcState): Promise<Session> {
        const gap = this.opts.sessionStartupDelayMs;
        const last = this.lastStartAt.get(shiftedDcId) ?? 0;
        const wait = gap - (Date.now() - last);
        if (gap > 0 && last > 0 && wait > 0) await timers.sleep(wait);
        try {
            const dcId = dc.dcId;
            const sessionKey = this.client.session.getAuthKey(dcId)?.getKey();
            const ownKey = dc.authKey.getKey();
            const isHome = dcId === this.client.session.dcId;
            if (sessionKey && (!ownKey || (isHome && !sessionKey.equals(ownKey)))) await dc.authKey.setKey(sessionKey);

            const media = isMediaDcId(shiftedDcId) && !this.client._addresses.isCdn(dcId);
            const mediaCluster = isDownloadDcId(shiftedDcId) || isDownloadSmallDcId(shiftedDcId);
            const pfs = media && this.client._usePfs() && !dc.pfsFailed && !!dc.authKey.getKey();
            const log = this.client._log;
            const session = this.client._makeSender(
                dcId,
                (_dc, reason) => this.onBreak(shiftedDcId, slot, dc, reason),
                pfs ? new AuthKey() : dc.authKey,
                true,
                pfs
                    ? {
                        permAuthKey: dc.authKey,
                        dcParam: -(dcId + (this.client._testServers ? 10000 : 0)),
                        expiresIn: tempKeyLifetime(),
                        onFailed: (error: unknown) => {
                            dc.pfsFailed = true;
                            log.info(
                                `Temporary key binding failed for dc ${dcId}, media sessions use the permanent key (${error instanceof Error ? error.message : error
                                })`
                            );
                        },
                    }
                    : undefined,
                media
            );
            return await this.client._connectSender(session, dcId, undefined, mediaCluster);
        } finally {
            this.lastStartAt.set(shiftedDcId, Date.now());
        }
    }

    private onBreak(shiftedDcId: ShiftedDcId, slot: SessionSlot, dc: DcState, reason: ConnectionBreakReason = "disconnected") {
        if (this.slots.get(shiftedDcId) === slot) this.slots.delete(shiftedDcId);
        if (reason !== "disconnected") dc.unauthorize();
        if (reason === "auth-broken" && dc.dcId !== this.client.session.dcId) {
            dc.authKey.setKey(undefined).catch(() => { });
            this.client.session.setAuthKey(undefined, dc.dcId);
        }
        slot.markDead(reason === "disconnected" ? "disconnected" : "auth-broken").catch(() => { });
    }
}
