import type { TelegramClient } from "./TelegramClient";
import type {
    EntitiesLike,
    Entity,
    EntityLike,
    FileLike,
    ValueOf,
} from "../define";
import { _fileToMedia } from "./uploads";
import { _parseInviteHash } from "./inviteLinks";
import {
    sleep,
    getMinBigInt,
    TotalList,
    returnBigInt,
} from "../Helpers";
import { RequestIter } from "../requestIter";
import * as helpers from "../Helpers";
import * as utils from "../Utils";
import { Api } from "../tl";
import bigInt, { BigInteger, isInstance } from "big-integer";
import { getPeerId } from "../Utils";

const _MAX_PARTICIPANTS_CHUNK_SIZE = 200;
const _MAX_ADMIN_LOG_CHUNK_SIZE = 100;
const _MAX_PROFILE_PHOTO_CHUNK_SIZE = 100;

interface ChatActionInterface {
    delay: number;
    autoCancel: boolean;
}

/**
 * Sends a chat action (e.g. "typing…") that repeats at a fixed interval until stopped.
 *
 * Supported action strings: `"typing"`, `"contact"`, `"game"`, `"location"`,
 * `"record-audio"` / `"record-voice"`, `"record-round"`, `"record-video"`,
 * `"audio"` / `"voice"` / `"song"`, `"round"`, `"video"`, `"photo"`,
 * `"document"` / `"file"`, `"cancel"`.
 * @internal
 */
class _ChatAction {
    static _str_mapping = {
        typing: new Api.SendMessageTypingAction(),
        contact: new Api.SendMessageChooseContactAction(),
        game: new Api.SendMessageGamePlayAction(),
        location: new Api.SendMessageGeoLocationAction(),

        "record-audio": new Api.SendMessageRecordAudioAction(),
        "record-voice": new Api.SendMessageRecordAudioAction(), //alias
        "record-round": new Api.SendMessageRecordRoundAction(),
        "record-video": new Api.SendMessageRecordVideoAction(),

        audio: new Api.SendMessageUploadAudioAction({ progress: 1 }),
        voice: new Api.SendMessageUploadAudioAction({ progress: 1 }), // alias
        song: new Api.SendMessageUploadAudioAction({ progress: 1 }), // alias
        round: new Api.SendMessageUploadRoundAction({ progress: 1 }),
        video: new Api.SendMessageUploadVideoAction({ progress: 1 }),

        photo: new Api.SendMessageUploadPhotoAction({ progress: 1 }),
        document: new Api.SendMessageUploadDocumentAction({ progress: 1 }),
        file: new Api.SendMessageUploadDocumentAction({ progress: 1 }), // alias

        cancel: new Api.SendMessageCancelAction(),
    };

    private _client: TelegramClient;
    private readonly _chat: EntityLike;
    private readonly _action: ValueOf<typeof _ChatAction._str_mapping>;
    private readonly _delay: number;
    private readonly autoCancel: boolean;
    private _request?: Api.AnyRequest;
    private _task: null;
    private _running: boolean;

    constructor(
        client: TelegramClient,
        chat: EntityLike,
        action: ValueOf<typeof _ChatAction._str_mapping>,
        params: ChatActionInterface = {
            delay: 4,
            autoCancel: true,
        }
    ) {
        this._client = client;
        this._chat = chat;
        this._action = action;
        this._delay = params.delay;
        this.autoCancel = params.autoCancel;
        this._request = undefined;
        this._task = null;
        this._running = false;
    }

    async start() {
        this._request = new Api.messages.SetTyping({
            peer: this._chat,
            action: this._action,
        });
        this._running = true;
        this._update();
    }

    async stop() {
        this._running = false;
        if (this.autoCancel) {
            await this._client.invoke(
                new Api.messages.SetTyping({
                    peer: this._chat,
                    action: new Api.SendMessageCancelAction(),
                })
            );
        }
    }

    async _update() {
        while (this._running) {
            if (this._request != undefined) {
                await this._client.invoke(this._request);
            }
            await sleep(this._delay * 1000);
        }
    }

    progress(current: number, total: number) {
        if ("progress" in this._action) {
            this._action.progress = 100 * Math.round(current / total);
        }
    }
}

interface ParticipantsIterInterface {
    entity: EntityLike;
    filter: any;
    offset?: number;
    search?: string;
    showTotal?: boolean;
}

export class _ParticipantsIter extends RequestIter {
    private filterEntity: ((entity: Entity) => boolean) | undefined;
    private requests?: Api.channels.GetParticipants[];

    async _init({
        entity,
        filter,
        offset,
        search,
        showTotal,
    }: ParticipantsIterInterface): Promise<boolean | void> {
        if (!offset) {
            offset = 0;
        }
        if (filter && filter.constructor === Function) {
            if (
                [
                    Api.ChannelParticipantsBanned,
                    Api.ChannelParticipantsKicked,
                    Api.ChannelParticipantsSearch,
                    Api.ChannelParticipantsContacts,
                ].includes(filter)
            ) {
                filter = new filter({
                    q: "",
                });
            } else {
                filter = new filter();
            }
        }
        entity = await this.client.getInputEntity(entity);
        const ty = helpers._entityType(entity);
        if (search && (filter || ty != helpers._EntityType.CHANNEL)) {
            // We need to 'search' ourselves unless we have a PeerChannel
            search = search.toLowerCase();
            this.filterEntity = (entity: Entity) => {
                return (
                    utils
                        .getDisplayName(entity)
                        .toLowerCase()
                        .includes(search!) ||
                    ("username" in entity ? entity.username || "" : "")
                        .toLowerCase()
                        .includes(search!)
                );
            };
        } else {
            this.filterEntity = (entity: Entity) => true;
        }
        // Only used for channels, but we should always set the attribute
        this.requests = [];
        if (ty == helpers._EntityType.CHANNEL) {
            if (showTotal) {
                const channel = await this.client.api.channels.getFullChannel(
                    { channel: entity }
                );
                
                if (channel.fullChat instanceof Api.ChannelFull) {
                    this.total = channel.fullChat.participantsCount;
                }
            }
            if (this.total && this.total <= 0) {
                return false;
            }
            this.requests.push(
                new Api.channels.GetParticipants({
                    channel: entity,
                    filter:
                        filter ||
                        new Api.ChannelParticipantsSearch({
                            q: search || "",
                        }),
                    offset,
                    limit: _MAX_PARTICIPANTS_CHUNK_SIZE,
                    hash: bigInt.zero,
                })
            );
        } else if (ty == helpers._EntityType.CHAT) {
            if (!("chatId" in entity)) {
                throw new Error(
                    "Found chat without id " + JSON.stringify(entity)
                );
            }
            const full = await this.client.api.messages.getFullChat({
                chatId: entity.chatId,
            });

            if (full.fullChat instanceof Api.ChatFull) {
                if (
                    !(
                        full.fullChat.participants instanceof
                        Api.ChatParticipantsForbidden
                    )
                ) {
                    this.total = full.fullChat.participants.participants.length;
                } else {
                    this.total = 0;
                    return false;
                }

                const users = new Map<string, Entity>();
                for (const user of full.users) {
                    users.set(user.id.toString(), user);
                }
                for (const participant of full.fullChat.participants
                    .participants) {
                    const user = users.get(participant.userId.toString())!;
                    if (!this.filterEntity(user)) {
                        continue;
                    }
                    (user as any).participant = participant;
                    this.buffer?.push(user);
                }
                return true;
            }
        } else {
            this.total = 1;
            if (this.limit != 0) {
                const user = await this.client.getEntity(entity);
                if (this.filterEntity(user)) {
                    (user as any).participant = undefined;
                    this.buffer?.push(user);
                }
            }
            return true;
        }
    }

    async _loadNextChunk(): Promise<boolean | undefined> {
        if (!this.requests?.length) {
            return true;
        }
        this.requests[0].limit = Math.min(
            this.limit - this.requests[0].offset,
            _MAX_PARTICIPANTS_CHUNK_SIZE
        );
        const results = [];
        for (const request of this.requests) {
            results.push(await this.client.invoke(request));
        }

        for (let i = this.requests.length - 1; i >= 0; i--) {
            const participants = results[i];
            if (
                participants instanceof
                    Api.channels.ChannelParticipantsNotModified ||
                !participants.users.length
            ) {
                this.requests.splice(i, 1);
                continue;
            }

            this.requests[i].offset += participants.participants.length;
            const users = new Map<string, Entity>();
            for (const user of participants.users) {
                users.set(user.id.toString(), user);
            }
            for (const participant of participants.participants) {
                if (!("userId" in participant)) {
                    continue;
                }
                const user = users.get(participant.userId.toString())!;
                if (this.filterEntity && !this.filterEntity(user)) {
                    continue;
                }
                (user as any).participant = participant;
                this.buffer?.push(user);
            }
        }
        return undefined;
    }

    [Symbol.asyncIterator](): AsyncIterator<Api.User, any, undefined> {
        return super[Symbol.asyncIterator]();
    }
}

/** Event filter for {@link iterAdminLog}/{@link getAdminLog}. Set only the event types you want. */
export interface AdminLogFilterParams {
    /** Join events, including joins via invite links. */
    join?: boolean;
    /** Leave events. */
    leave?: boolean;
    /** Invite events. */
    invite?: boolean;
    /** Ban events. */
    ban?: boolean;
    /** Unban events. */
    unban?: boolean;
    /** Kick events. */
    kick?: boolean;
    /** Unkick events. */
    unkick?: boolean;
    /** Admin promotion events. */
    promote?: boolean;
    /** Admin demotion events. */
    demote?: boolean;
    /** Info changes (title, about, photo…). */
    info?: boolean;
    /** Settings changes. */
    settings?: boolean;
    /** Message pin events. */
    pinned?: boolean;
    /** Message edit events. */
    edit?: boolean;
    /** Message delete events. */
    delete?: boolean;
    /** Group call events. */
    groupCall?: boolean;
    /** Invite link create/edit/revoke/delete events. */
    invites?: boolean;
    /** Message send events. */
    send?: boolean;
    /** Forum topic events. */
    forums?: boolean;
    /** Channel subscription extension events. */
    subExtend?: boolean;
    /** Admin custom-rank change events. */
    editRank?: boolean;
}

/** Parameters for {@link iterAdminLog}/{@link getAdminLog}. */
export interface AdminLogParams extends AdminLogFilterParams {
    /** How many events to retrieve. Defaults to all. */
    limit?: number;
    /** Search query to filter events. */
    search?: string;
    /** Only show events from these admins. */
    admins?: EntitiesLike;
    /** Minimum event ID. */
    minId?: BigInteger;
    /** Maximum event ID. */
    maxId?: BigInteger;
}

export class _AdminLogIter extends RequestIter {
    private entity?: Api.TypeInputPeer;
    private request?: Api.channels.GetAdminLog;

    async _init(params: { entity: EntityLike } & AdminLogParams) {
        const { entity, search, admins, minId, maxId, limit, ...filterArgs } =
            params;
        let eventsFilter = undefined;

        if (Object.values(filterArgs).find((element) => element === true)) {
            eventsFilter = new Api.ChannelAdminLogEventsFilter({
                ...filterArgs,
            });
        }
        this.entity = await this.client.getInputEntity(entity);
        let adminList = undefined;
        if (admins) {
            adminList = [];
            for (const admin of admins) {
                adminList.push(await this.client.getInputEntity(admin));
            }
        }
        this.request = new Api.channels.GetAdminLog({
            channel: this.entity,
            q: search || "",
            minId: minId ?? bigInt.zero,
            maxId: maxId ?? bigInt.zero,
            limit: 0,
            eventsFilter: eventsFilter,
            admins: adminList,
        });
    }

    async _loadNextChunk() {
        if (!this.request) {
            return true;
        }
        this.request.limit = Math.min(this.left, _MAX_ADMIN_LOG_CHUNK_SIZE);
        const r = await this.client.invoke(this.request);
        if (!r.events.length) {
            return true;
        }
        const entities = new Map();
        for (const entity of [...r.users, ...r.chats]) {
            entities.set(utils.getPeerId(entity), entity);
        }
        const eventIds: BigInteger[] = [];
        for (const e of r.events) {
            eventIds.push(e.id);
        }
        this.request.maxId = getMinBigInt(eventIds);
        for (const ev of r.events) {
            if (
                ev.action instanceof Api.ChannelAdminLogEventActionEditMessage
            ) {
                try {
                    (ev.action.prevMessage as Api.Message)._finishInit?.(
                        this.client,
                        entities,
                        this.entity
                    );
                    (ev.action.newMessage as Api.Message)._finishInit?.(
                        this.client,
                        entities,
                        this.entity
                    );
                } catch (e) {}
            }
            this.buffer?.push(ev);
        }
        if (r.events.length < this.request.limit) {
            return true;
        }
    }

    [Symbol.asyncIterator](): AsyncIterator<
        Api.ChannelAdminLogEvent,
        any,
        undefined
    > {
        return super[Symbol.asyncIterator]();
    }
}

/**
 * Used in iterParticipant and getParticipant. all params are optional.
 */
export interface IterParticipantsParams {
    /** how many members to retrieve. defaults to Number.MAX_SAFE_INTEGER (everyone) */
    limit?: number;
    /** how many members to skip. defaults to 0 */
    offset?: number;
    /** a query string to filter participants based on their display names and usernames. defaults to "" (everyone) */
    search?: string;
    /** optional filter to be used. E.g only admins filter or only banned members filter. PS : some filters need more permissions. */
    filter?: Api.TypeChannelParticipantsFilter;
    /** whether to call an extra request (GetFullChannel) to show the total of users in the group/channel. if set to false total will be 0 */
    showTotal?: boolean;
}

/** @hidden */
export function iterParticipants(
    client: TelegramClient,
    entity: EntityLike,
    { limit, offset, search, filter, showTotal = true }: IterParticipantsParams
) {
    return new _ParticipantsIter(
        client,
        limit ?? Number.MAX_SAFE_INTEGER,
        {},
        {
            entity: entity,
            filter: filter,
            offset: offset ?? 0,
            search: search,
            showTotal: showTotal,
        }
    );
}

/** @hidden */
export async function getParticipants(
    client: TelegramClient,
    entity: EntityLike,
    params: IterParticipantsParams
) {
    const it = client.iterParticipants(entity, params);
    return (await it.collect()) as TotalList<Api.User>;
}

/** @hidden */
export async function kickParticipant(
    client: TelegramClient,
    entity: EntityLike,
    participant: EntityLike
) {
    const peer = await client.getInputEntity(entity);
    const user = await client.getInputEntity(participant);
    let resp;
    let request;

    const type = helpers._entityType(peer);
    if (type === helpers._EntityType.CHAT) {
        request = new Api.messages.DeleteChatUser({
            chatId: returnBigInt(getPeerId(entity)),
            userId: returnBigInt(getPeerId(participant)),
        });
        resp = await client.invoke(request);
    } else if (type === helpers._EntityType.CHANNEL) {
        if (user instanceof Api.InputPeerSelf) {
            request = new Api.channels.LeaveChannel({
                channel: peer,
            });
            resp = await client.invoke(request);
        } else {
            request = new Api.channels.EditBanned({
                channel: peer,
                participant: user,
                bannedRights: new Api.ChatBannedRights({
                    untilDate: 0,
                    viewMessages: true,
                }),
            });
            resp = await client.invoke(request);
            await sleep(500);
            await client.invoke(
                new Api.channels.EditBanned({
                    channel: peer,
                    participant: user,
                    bannedRights: new Api.ChatBannedRights({ untilDate: 0 }),
                })
            );
        }
    } else {
        throw new Error("You must pass either a channel or a chat");
    }
    return client._getResponseMessage(request, resp, entity);
}

// region admin rights

/** Restrictions to apply with {@link editBanned}. Every unset right stays allowed. */
export interface EditBannedParams {
    /** Until when the restrictions apply. Defaults to forever. */
    untilDate?: number | Date;
    /** Disallow viewing messages (a full ban — kicks the participant). */
    viewMessages?: boolean;
    /** Disallow sending messages of any kind. */
    sendMessages?: boolean;
    /** Disallow sending any media. */
    sendMedia?: boolean;
    /** Disallow sending stickers. */
    sendStickers?: boolean;
    /** Disallow sending GIFs. */
    sendGifs?: boolean;
    /** Disallow sending games. */
    sendGames?: boolean;
    /** Disallow using inline bots. */
    sendInline?: boolean;
    /** Disallow embedding link previews. */
    embedLinks?: boolean;
    /** Disallow sending polls. */
    sendPolls?: boolean;
    /** Disallow sending photos. */
    sendPhotos?: boolean;
    /** Disallow sending videos. */
    sendVideos?: boolean;
    /** Disallow sending round videos. */
    sendRoundvideos?: boolean;
    /** Disallow sending audio files. */
    sendAudios?: boolean;
    /** Disallow sending voice messages. */
    sendVoices?: boolean;
    /** Disallow sending documents. */
    sendDocs?: boolean;
    /** Disallow sending plain text messages. */
    sendPlain?: boolean;
    /** Disallow sending reactions. */
    sendReactions?: boolean;
    /** Disallow changing the chat info. */
    changeInfo?: boolean;
    /** Disallow inviting users. */
    inviteUsers?: boolean;
    /** Disallow pinning messages. */
    pinMessages?: boolean;
    /** Disallow managing forum topics. */
    manageTopics?: boolean;
    /** Disallow changing own rank. */
    editRank?: boolean;
    /** Disallow managing linked peers. */
    manageLinkedPeers?: boolean;
}

function _toBannedRights(
    params: EditBannedParams | Api.ChatBannedRights
): Api.ChatBannedRights {
    if (params instanceof Api.ChatBannedRights) {
        return params;
    }
    const { untilDate, ...rights } = params;
    return new Api.ChatBannedRights({
        ...rights,
        untilDate:
            untilDate instanceof Date
                ? Math.floor(untilDate.getTime() / 1000)
                : untilDate || 0,
    });
}

/** @hidden */
export async function editBanned(
    client: TelegramClient,
    entity: EntityLike,
    participant: EntityLike,
    params: EditBannedParams | Api.ChatBannedRights = { viewMessages: true }
) {
    const channel = await client.getInputEntity(entity);
    const peer = await client.getInputEntity(participant);
    return client.invoke(
        new Api.channels.EditBanned({
            channel: channel,
            participant: peer,
            bannedRights: _toBannedRights(params),
        })
    );
}

/** Admin rights to grant with {@link editAdmin}. Every unset right stays revoked. */
export interface EditAdminParams {
    /** Allow changing the chat info. */
    changeInfo?: boolean;
    /** Allow posting messages (channels only). */
    postMessages?: boolean;
    /** Allow editing messages (channels only). */
    editMessages?: boolean;
    /** Allow deleting messages of other users. */
    deleteMessages?: boolean;
    /** Allow banning users. */
    banUsers?: boolean;
    /** Allow inviting users. */
    inviteUsers?: boolean;
    /** Allow pinning messages. */
    pinMessages?: boolean;
    /** Allow adding other admins. */
    addAdmins?: boolean;
    /** Send messages anonymously, as the group itself (supergroups only). */
    anonymous?: boolean;
    /** Allow managing group calls. */
    manageCall?: boolean;
    /** Set for admins with no other rights, to display them in the admin list. */
    other?: boolean;
    /** Allow managing forum topics. */
    manageTopics?: boolean;
    /** Allow posting stories. */
    postStories?: boolean;
    /** Allow editing stories. */
    editStories?: boolean;
    /** Allow deleting stories. */
    deleteStories?: boolean;
    /** Allow managing direct-messages channels. */
    manageDirectMessages?: boolean;
    /** Allow changing admin ranks. */
    manageRanks?: boolean;
    /** Allow managing linked peers. */
    manageLinkedPeers?: boolean;
    /** Custom admin rank (badge shown instead of "admin"). */
    rank?: string;
}

/** @hidden */
export async function editAdmin(
    client: TelegramClient,
    entity: EntityLike,
    participant: EntityLike,
    params: EditAdminParams | Api.ChatAdminRights
) {
    const peer = await client.getInputEntity(entity);
    const user = await client.getInputEntity(participant);
    const type = helpers._entityType(peer);
    if (type === helpers._EntityType.CHAT) {
        const isAdmin =
            params instanceof Api.ChatAdminRights ||
            Object.entries(params).some(
                ([key, value]) => key !== "rank" && value === true
            );
        return client.invoke(
            new Api.messages.EditChatAdmin({
                chatId: returnBigInt(utils.getPeerId(peer, false)),
                userId: user as unknown as Api.TypeInputUser,
                isAdmin: isAdmin,
            })
        );
    }
    let rights: Api.ChatAdminRights;
    let rank: string | undefined;
    if (params instanceof Api.ChatAdminRights) {
        rights = params;
    } else {
        const { rank: paramsRank, ...flags } = params;
        rank = paramsRank;
        rights = new Api.ChatAdminRights({ ...flags });
    }
    return client.invoke(
        new Api.channels.EditAdmin({
            channel: peer,
            userId: user as unknown as Api.TypeInputUser,
            adminRights: rights,
            rank: rank,
        })
    );
}

/** @hidden */
export async function editChatDefaultBannedRights(
    client: TelegramClient,
    entity: EntityLike,
    params: EditBannedParams | Api.ChatBannedRights
) {
    const peer = await client.getInputEntity(entity);
    return client.invoke(
        new Api.messages.EditChatDefaultBannedRights({
            peer: peer,
            bannedRights: _toBannedRights(params),
        })
    );
}

/** @hidden */
export async function getParticipant(
    client: TelegramClient,
    entity: EntityLike,
    participant: EntityLike
): Promise<Api.channels.ChannelParticipant> {
    const channel = await client.getInputEntity(entity);
    if (helpers._entityType(channel) !== helpers._EntityType.CHANNEL) {
        throw new Error(
            "getParticipant is only available for channels and supergroups; use getParticipants for small group chats"
        );
    }
    const peer = await client.getInputEntity(participant);
    return client.api.channels.getParticipant({
        channel: channel,
        participant: peer,
    });
}

// endregion

// region chat info

/** @hidden */
export async function editTitle(
    client: TelegramClient,
    entity: EntityLike,
    title: string
) {
    const peer = await client.getInputEntity(entity);
    if (helpers._entityType(peer) === helpers._EntityType.CHAT) {
        return client.invoke(
            new Api.messages.EditChatTitle({
                chatId: returnBigInt(utils.getPeerId(peer, false)),
                title: title,
            })
        );
    }
    return client.api.channels.editTitle({ channel: peer, title: title });
}

/** @hidden */
export async function editPhoto(
    client: TelegramClient,
    entity: EntityLike,
    photo?: FileLike | Api.TypeInputChatPhoto
) {
    const peer = await client.getInputEntity(entity);
    let chatPhoto: Api.TypeInputChatPhoto;
    if (photo == undefined) {
        chatPhoto = new Api.InputChatPhotoEmpty();
    } else if (
        photo instanceof Api.InputChatPhotoEmpty ||
        photo instanceof Api.InputChatUploadedPhoto ||
        photo instanceof Api.InputChatPhoto
    ) {
        chatPhoto = photo;
    } else {
        const { fileHandle } = await _fileToMedia(client, {
            file: photo as FileLike,
            asImage: true,
        });
        if (!fileHandle) {
            throw new Error(`Cannot use ${photo} as a chat photo`);
        }
        chatPhoto = new Api.InputChatUploadedPhoto({ file: fileHandle });
    }
    if (helpers._entityType(peer) === helpers._EntityType.CHAT) {
        return client.invoke(
            new Api.messages.EditChatPhoto({
                chatId: returnBigInt(utils.getPeerId(peer, false)),
                photo: chatPhoto,
            })
        );
    }
    return client.invoke(
        new Api.channels.EditPhoto({ channel: peer, photo: chatPhoto })
    );
}

/** @hidden */
export async function editChatAbout(
    client: TelegramClient,
    entity: EntityLike,
    about: string
): Promise<boolean> {
    const peer = await client.getInputEntity(entity);
    return client.api.messages.editChatAbout({ peer: peer, about: about });
}

/** @hidden */
export async function toggleSlowMode(
    client: TelegramClient,
    entity: EntityLike,
    seconds: number = 0
) {
    const channel = await client.getInputEntity(entity);
    return client.api.channels.toggleSlowMode({
        channel: channel,
        seconds: seconds,
    });
}

// endregion

// region chat lifecycle

/** Parameters for {@link createChannel}. */
export interface CreateChannelParams {
    /** The channel title. */
    title: string;
    /** The channel description. */
    about?: string;
    /** Create a supergroup instead of a broadcast channel. */
    megagroup?: boolean;
    /** Create a forum (requires `megagroup`). */
    forum?: boolean;
    /** Whether the group will be used to import messages from a foreign chat service. */
    forImport?: boolean;
    /** Geolocation of the supergroup (for geo chats). Requires `address`. */
    geoPoint?: Api.TypeInputGeoPoint;
    /** Physical address of the geo chat. */
    address?: string;
    /** Time-to-live of all messages that will be sent in the channel, in seconds. */
    ttlPeriod?: number;
}

/** @hidden */
export async function createChannel(
    client: TelegramClient,
    params: CreateChannelParams
): Promise<Api.Channel> {
    const result = await client.invoke(
        new Api.channels.CreateChannel({
            title: params.title,
            about: params.about || "",
            broadcast: !params.megagroup,
            megagroup: params.megagroup,
            forum: params.forum,
            forImport: params.forImport,
            geoPoint: params.geoPoint,
            address: params.address,
            ttlPeriod: params.ttlPeriod,
        })
    );
    if ("chats" in result) {
        for (const chat of result.chats) {
            if (chat instanceof Api.Channel) {
                return chat;
            }
        }
    }
    throw new Error("Could not find the created channel in the response");
}

/** Parameters for {@link createChat} (small group chats). */
export interface CreateChatParams {
    /** The chat title. */
    title: string;
    /** The users to invite into the chat. */
    users: EntitiesLike;
    /** Time-to-live of all messages that will be sent in the chat, in seconds. */
    ttlPeriod?: number;
}

/** @hidden */
export async function createChat(
    client: TelegramClient,
    params: CreateChatParams
): Promise<{ chat: Api.Chat; missingInvitees: Api.TypeMissingInvitee[] }> {
    const users: Api.TypeInputUser[] = [];
    for (const user of params.users) {
        users.push(
            (await client.getInputEntity(
                user
            )) as unknown as Api.TypeInputUser
        );
    }
    const result = await client.invoke(
        new Api.messages.CreateChat({
            title: params.title,
            users: users,
            ttlPeriod: params.ttlPeriod,
        })
    );
    if ("chats" in result.updates) {
        for (const chat of result.updates.chats) {
            if (chat instanceof Api.Chat) {
                return { chat, missingInvitees: result.missingInvitees };
            }
        }
    }
    throw new Error("Could not find the created chat in the response");
}

/** @hidden */
export async function joinChannel(
    client: TelegramClient,
    entity: EntityLike
) {
    const channel = await client.getInputEntity(entity);
    return client.api.channels.joinChannel({ channel: channel });
}

/** @hidden */
export async function importChatInvite(client: TelegramClient, link: string) {
    return client.api.messages.importChatInvite({
        hash: _parseInviteHash(link),
    });
}

/** @hidden */
export async function leaveChannel(client: TelegramClient, entity: EntityLike) {
    const channel = await client.getInputEntity(entity);
    return client.api.channels.leaveChannel({ channel: channel });
}

/** Parameters for {@link deleteHistory}. */
export interface DeleteHistoryParams {
    /** Delete only messages with IDs up to and including this one. Defaults to all. */
    maxId?: number;
    /** Delete the history for the other side as well (private chats and small groups: `revoke`; channels and supergroups: `forEveryone`). */
    revoke?: boolean;
    /** Only clear the history for the current user, without leaving the chat (private chats and small groups only). */
    justClear?: boolean;
    /** Only delete messages sent after this date (private chats and small groups only). */
    minDate?: number;
    /** Only delete messages sent before this date (private chats and small groups only). */
    maxDate?: number;
}

/** @hidden */
export async function deleteHistory(
    client: TelegramClient,
    entity: EntityLike,
    params: DeleteHistoryParams = {}
) {
    const peer = await client.getInputEntity(entity);
    if (helpers._entityType(peer) === helpers._EntityType.CHANNEL) {
        return client.api.channels.deleteHistory({
            channel: peer,
            maxId: params.maxId ?? 0,
            forEveryone: params.revoke,
        });
    }
    return client.api.messages.deleteHistory({
        peer: peer,
        maxId: params.maxId ?? 0,
        revoke: params.revoke,
        justClear: params.justClear,
        minDate: params.minDate,
        maxDate: params.maxDate,
    });
}

/** @hidden */
export async function editPeerFolders(
    client: TelegramClient,
    entity: EntityLike | EntityLike[],
    folderId: number
) {
    const entities = Array.isArray(entity) ? entity : [entity];
    const folderPeers: Api.InputFolderPeer[] = [];
    for (const e of entities) {
        folderPeers.push(
            new Api.InputFolderPeer({
                peer: await client.getInputEntity(e),
                folderId: folderId,
            })
        );
    }
    return client.invoke(
        new Api.folders.EditPeerFolders({ folderPeers: folderPeers })
    );
}

// endregion

/** Chat action names accepted by {@link setTyping}. */
export type ChatActionType = keyof typeof _ChatAction._str_mapping;

/** @hidden */
export async function setTyping(
    client: TelegramClient,
    entity: EntityLike,
    action: ChatActionType | Api.TypeSendMessageAction = "typing",
    params: { topMsgId?: number } = {}
): Promise<boolean> {
    const peer = await client.getInputEntity(entity);
    let resolved: Api.TypeSendMessageAction;
    if (typeof action === "string") {
        resolved = _ChatAction._str_mapping[action];
        if (!resolved) {
            throw new Error(`Unknown chat action: ${action}`);
        }
    } else {
        resolved = action;
    }
    return client.invoke(
        new Api.messages.SetTyping({
            peer: peer,
            action: resolved,
            topMsgId: params.topMsgId,
        })
    );
}

/** @hidden */
export function iterAdminLog(
    client: TelegramClient,
    entity: EntityLike,
    params: AdminLogParams = {}
) {
    return new _AdminLogIter(client, params.limit ?? Number.MAX_SAFE_INTEGER, {}, {
        entity: entity,
        ...params,
    });
}

/** @hidden */
export async function getAdminLog(
    client: TelegramClient,
    entity: EntityLike,
    params: AdminLogParams = {}
) {
    return (await iterAdminLog(client, entity, params).collect()) as TotalList<
        Api.ChannelAdminLogEvent
    >;
}
