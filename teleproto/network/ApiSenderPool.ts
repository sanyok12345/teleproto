import { MTProtoSender } from "./MTProtoSender";
import { SenderSlot } from "./SenderSlot";
import type { TelegramBaseClient } from "../client/telegramBaseClient";

export interface ApiSenderPoolOptions {
    /**
     * Disconnect an idle borrowed sender after this many ms of inactivity.
     * The next {@link ApiSenderPool.lease} call will lazily reconnect.
     */
    idleTimeoutMs: number;
}

export interface SenderLease {
    sender: MTProtoSender;
    release: () => void;
}

/**
 * One borrowed MTProtoSender per non-main DC for arbitrary API calls
 * (everything except file transfer, which uses {@link FilePool}).
 *
 * Slots are lazily connected on first lease. A broken auth key on a
 * non-main DC purges the session's stored key for that DC and the slot
 * is discarded; the next lease rebuilds it.
 */
export class ApiSenderPool {
    private readonly _slots = new Map<number, SenderSlot>();
    private readonly _client: TelegramBaseClient;
    private readonly _idleTimeoutMs: number;
    private _closed = false;

    constructor(client: TelegramBaseClient, opts: ApiSenderPoolOptions) {
        this._client = client;
        this._idleTimeoutMs = opts.idleTimeoutMs;
    }

    async lease(dcId: number): Promise<SenderLease> {
        if (this._closed) {
            throw new Error("ApiSenderPool is closed");
        }
        let slot = this._slots.get(dcId);
        if (!slot || slot.state === "dead") {
            slot = this._createSlot(dcId);
        }
        const sender = await slot.ensureConnected();
        const activeSlot = slot;
        activeSlot.enter();
        let released = false;
        return {
            sender,
            release: () => {
                if (released) return;
                released = true;
                activeSlot.leave();
            },
        };
    }

    has(dcId: number): boolean {
        return this._slots.has(dcId);
    }

    private _createSlot(dcId: number): SenderSlot {
        const slot: SenderSlot = new SenderSlot({
            dcId,
            idleTimeoutMs: this._idleTimeoutMs,
            log: this._client._log,
            connect: async () => {
                const sender = this._client._makeSender(dcId, () => {
                    this._onSenderBreak(dcId, slot);
                });
                return this._client._connectSender(sender, dcId);
            },
        });
        this._slots.set(dcId, slot);
        return slot;
    }

    private _onSenderBreak(dcId: number, slot: SenderSlot): void {
        if (this._client.session.dcId !== dcId) {
            this._client.session.setAuthKey(undefined, dcId);
        }
        if (this._slots.get(dcId) === slot) {
            this._slots.delete(dcId);
        }
        slot.markDead("auth-broken").catch(() => {});
    }

    async purge(dcId?: number): Promise<void> {
        if (dcId !== undefined) {
            const s = this._slots.get(dcId);
            if (s) {
                this._slots.delete(dcId);
                await s.markDead("manual");
            }
            return;
        }
        const slots = [...this._slots.values()];
        this._slots.clear();
        await Promise.all(slots.map((s) => s.markDead("manual")));
    }

    async close(): Promise<void> {
        this._closed = true;
        const slots = [...this._slots.values()];
        this._slots.clear();
        await Promise.all(slots.map((s) => s.markDead("pool-closed")));
    }
}
