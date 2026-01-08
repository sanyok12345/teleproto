import { Api } from "../tl";
import type { TelegramClient } from "..";
import type { Entity, EntityLike } from "../define";
import { EventBuilder, EventCommonSender, _intoIdSet } from "./common";
import bigInt from "big-integer";

export interface UserUpdateInterface {
    /**
     * Filter by users. Only updates from these users will be handled.
     */
    chats?: EntityLike[];
    /**
     * Whether to treat the chats as a blacklist instead of whitelist.
     */
    blacklistChats?: boolean;
    /**
     * A callable function that should accept the event as input
     * and return a value indicating whether the event should be dispatched.
     */
    func?: CallableFunction;
}

type TypingUpdate =
    | Api.UpdateUserTyping
    | Api.UpdateChatUserTyping
    | Api.UpdateChannelUserTyping;

type UserUpdateType = Api.UpdateUserStatus | TypingUpdate;

/**
 * Occurs whenever a user goes online, starts typing, etc.
 *
 * @example
 * ```ts
 * client.addEventHandler((event: UserUpdateEvent) => {
 *     if (event.online) {
 *         console.log(`${event.userId} is now online!`);
 *     }
 *     if (event.typing) {
 *         console.log(`${event.userId} is typing...`);
 *     }
 * }, new UserUpdate({}));
 * ```
 */
export class UserUpdate extends EventBuilder {
    constructor(params: UserUpdateInterface = {}) {
        super({
            chats: params.chats,
            blacklistChats: params.blacklistChats,
            func: params.func,
        });
    }

    async _resolve(client: TelegramClient) {
        this.chats = await _intoIdSet(client, this.chats);
    }

    build(update: Api.TypeUpdate): UserUpdateEvent | undefined {
        if (update instanceof Api.UpdateUserStatus) {
            return new UserUpdateEvent(update);
        }
        if (
            update instanceof Api.UpdateUserTyping ||
            update instanceof Api.UpdateChatUserTyping ||
            update instanceof Api.UpdateChannelUserTyping
        ) {
            return new UserUpdateEvent(update);
        }
        return undefined;
    }

    filter(event: UserUpdateEvent): UserUpdateEvent | undefined {
        if (this.chats != undefined) {
            const userId = event.userId?.toString();
            if (!userId || !this.chats.includes(userId)) {
                if (!this.blacklistChats) {
                    return undefined;
                }
            } else if (this.blacklistChats) {
                return undefined;
            }
        }
        if (this.func && !this.func(event)) {
            return undefined;
        }
        return event;
    }
}

/**
 * Represents a user update event (status change or typing action).
 */
export class UserUpdateEvent extends EventCommonSender {
    _eventName = "UserUpdate";

    originalUpdate: (UserUpdateType) & { _entities?: Map<string, Entity> };
    private _status?: Api.TypeUserStatus;
    private _action?: Api.TypeSendMessageAction;
    private _userId: bigInt.BigInteger;
    private _chatId?: bigInt.BigInteger;

    constructor(update: UserUpdateType) {
        let chatPeer: Api.TypePeer | undefined;
        let userId: bigInt.BigInteger;

        if (update instanceof Api.UpdateUserStatus) {
            userId = update.userId;
            chatPeer = new Api.PeerUser({ userId: update.userId });
        } else if (update instanceof Api.UpdateUserTyping) {
            userId = update.userId;
            chatPeer = new Api.PeerUser({ userId: update.userId });
        } else if (update instanceof Api.UpdateChatUserTyping) {
            userId = update.fromId instanceof Api.PeerUser
                ? update.fromId.userId
                : bigInt.zero;
            chatPeer = new Api.PeerChat({ chatId: update.chatId });
        } else {
            // UpdateChannelUserTyping
            userId = update.fromId instanceof Api.PeerUser
                ? update.fromId.userId
                : bigInt.zero;
            chatPeer = new Api.PeerChannel({ channelId: update.channelId });
        }

        super({ chatPeer });

        this.originalUpdate = update;
        this._userId = userId;

        if (update instanceof Api.UpdateUserStatus) {
            this._status = update.status;
        } else {
            this._action = update.action;
            if (update instanceof Api.UpdateChatUserTyping) {
                this._chatId = update.chatId;
            } else if (update instanceof Api.UpdateChannelUserTyping) {
                this._chatId = update.channelId;
            }
        }
    }

    /**
     * The ID of the user whose status/action changed.
     */
    get userId(): bigInt.BigInteger {
        return this._userId;
    }

    /**
     * The raw status object (if this is a status update).
     */
    get status(): Api.TypeUserStatus | undefined {
        return this._status;
    }

    /**
     * The raw action object (if this is a typing/action update).
     */
    get action(): Api.TypeSendMessageAction | undefined {
        return this._action;
    }


    // ==================== Status Properties ====================

    /**
     * Whether the user is currently online.
     */
    get online(): boolean | undefined {
        if (!this._status) return undefined;
        return this._status instanceof Api.UserStatusOnline;
    }

    /**
     * Whether the user went offline.
     */
    get offline(): boolean | undefined {
        if (!this._status) return undefined;
        return this._status instanceof Api.UserStatusOffline;
    }

    /**
     * When the user's online status expires (if online).
     */
    get until(): Date | undefined {
        if (this._status instanceof Api.UserStatusOnline) {
            return new Date(this._status.expires * 1000);
        }
        return undefined;
    }

    /**
     * When the user was last seen (if offline).
     */
    get lastSeen(): Date | undefined {
        if (this._status instanceof Api.UserStatusOffline) {
            return new Date(this._status.wasOnline * 1000);
        }
        return undefined;
    }

    /**
     * Whether the user was seen recently.
     */
    get recently(): boolean | undefined {
        if (!this._status) return undefined;
        return this._status instanceof Api.UserStatusRecently;
    }

    /**
     * Whether the user was seen within the last week.
     */
    get withinWeeks(): boolean | undefined {
        if (!this._status) return undefined;
        return this._status instanceof Api.UserStatusLastWeek;
    }

    /**
     * Whether the user was seen within the last month.
     */
    get withinMonths(): boolean | undefined {
        if (!this._status) return undefined;
        return this._status instanceof Api.UserStatusLastMonth;
    }

    // ==================== Action Properties ====================

    /**
     * Whether the user is typing a message.
     */
    get typing(): boolean | undefined {
        if (!this._action) return undefined;
        return this._action instanceof Api.SendMessageTypingAction;
    }

    /**
     * Whether the user cancelled the action.
     */
    get cancel(): boolean | undefined {
        if (!this._action) return undefined;
        return this._action instanceof Api.SendMessageCancelAction;
    }

    /**
     * Whether the user is recording something (audio, video, or round).
     */
    get recording(): boolean | undefined {
        if (!this._action) return undefined;
        return (
            this._action instanceof Api.SendMessageRecordVideoAction ||
            this._action instanceof Api.SendMessageRecordAudioAction ||
            this._action instanceof Api.SendMessageRecordRoundAction
        );
    }

    /**
     * Whether the user is uploading something.
     */
    get uploading(): boolean | undefined {
        if (!this._action) return undefined;
        return (
            this._action instanceof Api.SendMessageUploadVideoAction ||
            this._action instanceof Api.SendMessageUploadAudioAction ||
            this._action instanceof Api.SendMessageUploadPhotoAction ||
            this._action instanceof Api.SendMessageUploadDocumentAction ||
            this._action instanceof Api.SendMessageUploadRoundAction
        );
    }

    /**
     * Whether the user is recording or sending audio.
     */
    get audio(): boolean | undefined {
        if (!this._action) return undefined;
        return (
            this._action instanceof Api.SendMessageRecordAudioAction ||
            this._action instanceof Api.SendMessageUploadAudioAction
        );
    }

    /**
     * Whether the user is recording or sending video.
     */
    get video(): boolean | undefined {
        if (!this._action) return undefined;
        return (
            this._action instanceof Api.SendMessageRecordVideoAction ||
            this._action instanceof Api.SendMessageUploadVideoAction
        );
    }

    /**
     * Whether the user is recording or sending a round video.
     */
    get round(): boolean | undefined {
        if (!this._action) return undefined;
        return (
            this._action instanceof Api.SendMessageRecordRoundAction ||
            this._action instanceof Api.SendMessageUploadRoundAction
        );
    }

    /**
     * Whether the user is uploading a photo.
     */
    get photo(): boolean | undefined {
        if (!this._action) return undefined;
        return this._action instanceof Api.SendMessageUploadPhotoAction;
    }

    /**
     * Whether the user is uploading a document.
     */
    get document(): boolean | undefined {
        if (!this._action) return undefined;
        return this._action instanceof Api.SendMessageUploadDocumentAction;
    }

    /**
     * Whether the user is sending a geo location.
     */
    get geo(): boolean | undefined {
        if (!this._action) return undefined;
        return this._action instanceof Api.SendMessageGeoLocationAction;
    }

    /**
     * Whether the user is choosing a contact to share.
     */
    get contact(): boolean | undefined {
        if (!this._action) return undefined;
        return this._action instanceof Api.SendMessageChooseContactAction;
    }

    /**
     * Whether the user is playing a game.
     */
    get playing(): boolean | undefined {
        if (!this._action) return undefined;
        return this._action instanceof Api.SendMessageGamePlayAction;
    }

    /**
     * Whether the user is choosing a sticker.
     */
    get sticker(): boolean | undefined {
        if (!this._action) return undefined;
        return this._action instanceof Api.SendMessageChooseStickerAction;
    }

    /**
     * Upload progress (0-100) if uploading, otherwise undefined.
     */
    get uploadProgress(): number | undefined {
        if (
            this._action instanceof Api.SendMessageUploadVideoAction ||
            this._action instanceof Api.SendMessageUploadAudioAction ||
            this._action instanceof Api.SendMessageUploadPhotoAction ||
            this._action instanceof Api.SendMessageUploadDocumentAction ||
            this._action instanceof Api.SendMessageUploadRoundAction
        ) {
            return this._action.progress;
        }
        return undefined;
    }

    /**
     * Fetches the User entity for this event.
     */
    async getUser(): Promise<Api.User | undefined> {
        if (!this._client) return undefined;
        try {
            const result = await this._client.getEntity(
                new Api.PeerUser({ userId: this._userId })
            );
            if (result instanceof Api.User) {
                return result;
            }
        } catch {
            return undefined;
        }
        return undefined;
    }

    /**
     * Gets the InputUser for this event.
     */
    async getInputUser(): Promise<Api.InputUser | Api.InputPeerUser | undefined> {
        if (!this._client) return undefined;
        try {
            return await this._client.getInputEntity(
                new Api.PeerUser({ userId: this._userId })
            ) as Api.InputUser | Api.InputPeerUser;
        } catch {
            return undefined;
        }
    }
}
