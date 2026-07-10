import { SenderSlot } from "./SenderSlot";
import { Dcenter } from "./Dcenter";
import {
    ShiftedDcId,
    bareDcId,
    getDcIdShift,
    isDownloadDcId,
    isUploadDcId,
} from "./core_types";
import { TEMP_KEY_EXPIRES_IN } from "./TempAuthKey";
import { sleep } from "../Helpers";
import type { MTProtoSender } from "./MTProtoSender";
import type { TelegramBaseClient } from "../client/telegramBaseClient";

export interface NetworkOptions {

    idleTimeoutMs: number;

    sessionStartupDelayMs: number;
}

export interface SessionLease {
    sender: MTProtoSender;
    release: () => void;
}

export class Network {
    private readonly _client: TelegramBaseClient;
    private readonly _opts: NetworkOptions;
    private readonly _slots = new Map<ShiftedDcId, SenderSlot>();

    private readonly _connectChains = new Map<number, Promise<unknown>>();
    private readonly _lastConnectAt = new Map<number, number>();
    private _closed = false;

    constructor(client: TelegramBaseClient, opts: NetworkOptions) {
        this._client = client;
        this._opts = opts;
    }

    dcenter(dcId: number): Dcenter {
        return this._client._dcenters.get(
            dcId,
            this._client.session.getAuthKey(dcId)
        );
    }

    getSession(shiftedDcId: ShiftedDcId): SenderSlot {
        if (this._closed) throw new Error("Network is closed");
        let slot = this._slots.get(shiftedDcId);
        if (!slot || slot.state === "dead") {
            slot = this._makeSlot(shiftedDcId);
            this._slots.set(shiftedDcId, slot);
        }
        return slot;
    }

    async lease(dcId: number): Promise<SessionLease> {
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

    removeSession(shiftedDcId: ShiftedDcId): void {
        const slot = this._slots.get(shiftedDcId);
        if (slot) {
            this._slots.delete(shiftedDcId);
            slot.markDead("manual").catch(() => {});
        }
    }

    private _makeSlot(shiftedDcId: ShiftedDcId): SenderSlot {
        const dcId = bareDcId(shiftedDcId);
        const dcenter = this.dcenter(dcId);
        const slot: SenderSlot = new SenderSlot({
            dcId,
            idleTimeoutMs: this._opts.idleTimeoutMs,
            log: this._client._log,
            connect: async () => {

                const chain =
                    this._connectChains.get(dcId) ?? Promise.resolve();
                const ours = chain.then(() =>
                    this._gatedConnect(dcId, shiftedDcId, slot, dcenter)
                );
                this._connectChains.set(
                    dcId,
                    ours.catch(() => {})
                );
                return ours;
            },
        });
        return slot;
    }

    private async _gatedConnect(
        dcId: number,
        shiftedDcId: ShiftedDcId,
        slot: SenderSlot,
        dcenter: Dcenter
    ): Promise<MTProtoSender> {
        const gap = this._opts.sessionStartupDelayMs;
        const last = this._lastConnectAt.get(dcId) ?? 0;
        if (gap > 0 && last > 0) {
            const wait = gap - (Date.now() - last);
            if (wait > 0) await sleep(wait);
        }
        try {

            const isMedia =
                isDownloadDcId(shiftedDcId) || isUploadDcId(shiftedDcId);
            const useTemp =
                isMedia &&
                dcenter.mediaTempUsable &&
                !!dcenter.authKey.getKey();
            if (
                useTemp &&
                dcenter.mediaTempExpiresAt > 0 &&
                dcenter.mediaTempExpiresAt <
                    Math.floor(Date.now() / 1000) + 60
            ) {
                dcenter.resetMediaTempKey();
            }
            const log = this._client._log;

            const sender = this._client._makeSender(
                dcId,
                () => this._onSenderBreak(shiftedDcId, slot),
                useTemp ? dcenter.mediaTempKey : dcenter.authKey,
                false,
                useTemp
                    ? {
                          permAuthKey: dcenter.authKey,

                          dcParam: -(
                              dcId +
                              ((this._client as any)._testServers ? 10000 : 0)
                          ),
                          expiresIn: TEMP_KEY_EXPIRES_IN,
                          isBound: () => dcenter.mediaBound,
                          onBound: (expiresAt: number) => {
                              dcenter.mediaBound = true;
                              dcenter.mediaTempExpiresAt = expiresAt;
                          },
                          onFailed: (err: unknown) => {
                              dcenter.mediaTempFailed = true;
                              dcenter.resetMediaTempKey();
                              log.info(
                                  `Temp-key binding failed for dc ${dcId}, media sessions fall back to the permanent key (${
                                      err instanceof Error ? err.message : err
                                  })`
                              );
                          },
                      }
                    : undefined
            );
            return await this._client._connectSender(sender, dcId);
        } finally {
            this._lastConnectAt.set(dcId, Date.now());
        }
    }

    private _onSenderBreak(shiftedDcId: ShiftedDcId, slot: SenderSlot): void {

        if (this._slots.get(shiftedDcId) === slot) {
            this._slots.delete(shiftedDcId);
        }

        const shift = getDcIdShift(shiftedDcId);
        const dcId = bareDcId(shiftedDcId);
        if (shift === 0 && dcId !== this._client.session.dcId) {
            this._client.session.setAuthKey(undefined, dcId);
        }
        if (isDownloadDcId(shiftedDcId) || isUploadDcId(shiftedDcId)) {
            this.dcenter(dcId).resetMediaTempKey();
        }
        slot.markDead("manual").catch(() => {});
    }

    async purge(): Promise<void> {
        const dying = [...this._slots.values()];
        this._slots.clear();
        await Promise.all(dying.map((s) => s.markDead("manual").catch(() => {})));
    }

    async close(): Promise<void> {
        this._closed = true;
        const dying = [...this._slots.values()];
        this._slots.clear();
        await Promise.all(
            dying.map((s) => s.markDead("pool-closed").catch(() => {}))
        );
    }
}
