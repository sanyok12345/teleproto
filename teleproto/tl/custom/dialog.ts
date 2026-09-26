import type { TelegramClient } from "../../client/TelegramClient";
import { Api } from "../api";
import type { Entity } from "../../define";
import { getDisplayName, getInputChannel, getInputPeer, getPeerId } from "../../Utils";
import { Draft } from "./draft";
import { returnBigInt } from "../../Helpers";
import bigInt from "big-integer";
import type { SendMessageParams } from "../../client/messages";
import type { DeleteHistoryParams } from "../../client/chats";

export class Dialog {
    _client: TelegramClient;
    dialog: Api.Dialog | Api.DialogCommunity;
    pinned: boolean;
    folderId?: number;
    archived: boolean;
    message?: Api.Message;
    date?: number;
    entity?: Entity;
    inputEntity: Api.TypeInputPeer;
    id?: bigInt.BigInteger;
    name?: string;
    title?: string;
    unreadCount: number;
    unreadMentionsCount: number;
    draft: Draft;
    isUser: boolean;
    isGroup: boolean;
    isChannel: boolean;
    /** Whether this row represents a community instead of a conversation. */
    isCommunity: boolean;

    constructor(
        client: TelegramClient,
        dialog: Api.Dialog | Api.DialogCommunity,
        entities: Map<string, Entity>,
        message?: Api.Message
    ) {
        this._client = client;
        this.dialog = dialog;
        this.pinned = !!dialog.pinned;
        this.folderId = dialog instanceof Api.Dialog ? dialog.folderId : undefined;
        this.archived = this.folderId != undefined;
        this.message = message;
        this.date = this.message?.date;

        const peer = dialog instanceof Api.DialogCommunity
            ? new Api.PeerChannel({ channelId: dialog.communityId })
            : dialog.peer;
        this.entity = entities.get(getPeerId(peer));
        this.inputEntity = getInputPeer(this.entity);
        if (this.entity) {
            this.id = returnBigInt(getPeerId(this.entity)); // ^ May be InputPeerSelf();
            this.name = this.title = getDisplayName(this.entity);
        }

        this.unreadCount = dialog instanceof Api.Dialog ? dialog.unreadCount : 0;
        this.unreadMentionsCount = dialog instanceof Api.Dialog ? dialog.unreadMentionsCount : 0;
        if (!this.entity) {
            throw new Error("Entity not found for dialog");
        }
        this.draft = new Draft(client, this.entity, dialog instanceof Api.Dialog ? dialog.draft : undefined);

        this.isUser = this.entity instanceof Api.User;
        this.isGroup = !!(
            this.entity instanceof Api.Chat ||
            this.entity instanceof Api.ChatForbidden ||
            (this.entity instanceof Api.Channel && this.entity.megagroup)
        );
        this.isChannel = this.entity instanceof Api.Channel;
        this.isCommunity = dialog instanceof Api.DialogCommunity;
    }

    /** Input dialog reference, including the distinct community constructor. */
    get inputDialog(): Api.TypeInputDialogPeer {
        return this.isCommunity
            ? new Api.InputDialogPeerCommunity({ community: getInputChannel(this.inputEntity) })
            : new Api.InputDialogPeer({ peer: this.inputEntity });
    }

    /** Groups or expands a community row; unavailable for ordinary dialogs. */
    async setCollapsed(collapsed: boolean) {
        if (!this.isCommunity) throw new Error("The dialog is not a community");
        const result = await this._client.setCommunityCollapsed(this.inputEntity, collapsed);
        if (this.entity instanceof Api.Community) {
            this.entity.collapsedInDialogs = collapsed || undefined;
        }
        return result;
    }

    /** Sends a message to this dialog. A bare string is used as the message text. */
    async send(params: string | SendMessageParams) {
        return this._client.sendMessage(
            this.inputEntity,
            typeof params === "string" ? { message: params } : params
        );
    }

    /** Marks all messages in this dialog as read (clearing mentions too when asked). */
    async markAsRead(params?: { clearMentions?: boolean }) {
        return this._client.markAsRead(this.inputEntity, undefined, params);
    }

    /** Moves this dialog to the archive folder. */
    async archive() {
        this.archived = true;
        this.folderId = 1;
        return this._client.editPeerFolders(this.inputEntity, 1);
    }

    /** Moves this dialog back to the main chat list. */
    async unarchive() {
        this.archived = false;
        this.folderId = 0;
        return this._client.editPeerFolders(this.inputEntity, 0);
    }

    /** Pins or unpins this dialog in the chat list (`messages.toggleDialogPin`). */
    async pin(pinned: boolean = true) {
        const result = await this._client.invoke(
            new Api.messages.ToggleDialogPin({
                peer: this.inputDialog as unknown as Api.TypeEntityLike,
                pinned: pinned || undefined,
            })
        );
        this.pinned = pinned;
        return result;
    }

    /** Unpins this dialog in the chat list. */
    async unpin() {
        return this.pin(false);
    }

    /**
     * Deletes this dialog: leaves channels/supergroups, or deletes the
     * message history of private chats and small groups (see {@link DeleteHistoryParams}).
     */
    async delete(params?: DeleteHistoryParams) {
        if (this.isChannel || this.isCommunity) {
            return this._client.leaveChannel(this.inputEntity);
        }
        return this._client.deleteHistory(this.inputEntity, params);
    }
}
