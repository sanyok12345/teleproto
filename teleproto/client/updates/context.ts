import type { TelegramClient } from "../TelegramClient";
import type { Entity } from "../../define";
import { EventCommon } from "../../events/common";
import { getPeer } from "../../Utils";
import bigInt from "big-integer";

/** Chat access for raw updates; entity fetching is deferred until `getChat()`. */
export class UpdateContext extends EventCommon {
    private pendingChat?: Promise<Entity | undefined>;

    constructor(client: TelegramClient, peerId?: string, entities?: Map<string, Entity>) {
        super({ chatPeer: peerId === undefined ? undefined : getPeer(bigInt(peerId)) });
        this._entities = entities ?? new Map();
        this._setClient(client);
    }

    /** Returns the attached chat or fetches it, sharing concurrent calls within this update. */
    async getChat(): Promise<Entity | undefined> {
        if (!this.pendingChat) {
            this.pendingChat = super.getChat();
        }
        const pending = this.pendingChat;
        try {
            return await pending;
        } finally {
            if (this.pendingChat === pending) this.pendingChat = undefined;
        }
    }
}

/** The original event with a non-enumerable chat context. */
export type WithUpdateContext<T> = T & { readonly context: UpdateContext };
