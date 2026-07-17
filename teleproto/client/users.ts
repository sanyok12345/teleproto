import { Api } from "../tl";
import type { Entity, EntityLike } from "../define";
import { getPeerId as peerUtils, parseID } from "../Utils";
import {
    _entityType,
    _EntityType,
    sleep,
    isArrayLike,
    returnBigInt,
    unionId,
} from "../Helpers";
import * as errors from "../errors";
import * as utils from "../Utils";
import type { TelegramClient } from "./TelegramClient";
import bigInt from "big-integer";
import { RequestState } from "../network/RequestState";
import { MTProtoSender } from "../network";
import type { SessionLease } from "../network/Network";

// UserMethods {
// region Invoking Telegram request

/**
 * Invokes a raw Telegram API request and returns the result.
 *
 * Handles automatic retry on transient errors (server errors, flood waits below
 * {@link TelegramClientParams.floodSleepThreshold}, DC migration, reCAPTCHA),
 * and caches any entities found in the response.
 *
 * @param client - The Telegram client instance.
 * @param request - The MTProto request to invoke.
 * @param dcId - Optional DC to send the request to (uses a borrowed sender).
 * @param otherSender - Optional explicit sender to use instead of the default.
 * @returns The response corresponding to the request type.
 * @throws {FloodWaitError} If the flood wait exceeds `floodSleepThreshold`.
 * @throws {Error} If the request fails after all retries.
 * @hidden
 */
interface InvokeAttempt {
    client: TelegramClient;
    request: Api.AnyRequest;
    state: RequestState;
    dcId?: number;
    sender: MTProtoSender;
    lease?: SessionLease;
}

type InvokeErrorPolicy = (e: any, ctx: InvokeAttempt) => Promise<boolean>;

const telegramInternalErrors: InvokeErrorPolicy = async (e, ctx) => {
    if (
        !(
            e instanceof errors.ServerError ||
            e.errorMessage === "RPC_CALL_FAIL" ||
            e.errorMessage === "RPC_MCGET_FAIL"
        )
    ) {
        return false;
    }
    ctx.client._log.warn(
        `Telegram is having internal issues ${e.constructor.name}`
    );
    await sleep(2000);
    return true;
};

const floodWait: InvokeErrorPolicy = async (e, ctx) => {
    if (
        !(
            e instanceof errors.FloodWaitError ||
            e instanceof errors.FloodTestPhoneWaitError
        )
    ) {
        return false;
    }
    if (e.seconds > ctx.client.floodSleepThreshold) {
        throw e;
    }
    ctx.client._log.info(
        `Sleeping for ${e.seconds}s on flood wait (Caused by ${ctx.request.className})`
    );
    await sleep(e.seconds * 1000);
    return true;
};

const dcMigration: InvokeErrorPolicy = async (e, ctx) => {
    if (
        !(
            e instanceof errors.PhoneMigrateError ||
            e instanceof errors.NetworkMigrateError ||
            e instanceof errors.UserMigrateError
        )
    ) {
        return false;
    }
    if (
        e instanceof errors.UserMigrateError &&
        (ctx.dcId !== undefined || ctx.sender !== ctx.client._sender) &&
        e.newDc === ctx.client.session.dcId
    ) {
        ctx.client._log.info(
            `Request must run on the home DC ${e.newDc}; rerouting to the main sender`
        );
        ctx.lease?.release();
        ctx.lease = undefined;
        ctx.dcId = undefined;
        ctx.sender = ctx.client._sender!;
        return true;
    }
    ctx.client._log.info(`Migrating to data center ${e.newDc}`);
    const shouldRaise =
        e instanceof errors.PhoneMigrateError ||
        e instanceof errors.NetworkMigrateError;
    if (shouldRaise && (await ctx.client.isUserAuthorized())) {
        throw e;
    }
    await ctx.client._switchDC(e.newDc);
    ctx.lease?.release();
    ctx.lease = undefined;
    if (ctx.dcId === undefined) {
        ctx.sender = ctx.client._sender!;
    } else {
        ctx.lease = await ctx.client._leaseSender(ctx.dcId);
        ctx.sender = ctx.lease.sender;
    }
    return true;
};

const msgWait: InvokeErrorPolicy = async (e, ctx) => {
    if (!(e instanceof errors.MsgWaitError)) {
        return false;
    }
    await ctx.state.isReady();
    ctx.state.after = undefined;
    return true;
};

const reCaptcha: InvokeErrorPolicy = async (e, ctx) => {
    if (
        !(
            e.errorMessage &&
            e.errorMessage.startsWith("RECAPTCHA_CHECK_") &&
            ctx.client._reCaptchaCallback
        )
    ) {
        return false;
    }
    const match = e.errorMessage.match(/RECAPTCHA_CHECK_.*(6Le[-\w]+)/);
    if (!match) {
        throw e;
    }
    const token = await ctx.client._reCaptchaCallback(match[1]);
    const newRequest = new Api.InvokeWithReCaptcha({
        token: token,
        query: ctx.request,
    });
    await newRequest.resolve(ctx.client, utils);
    ctx.state.request = newRequest;
    ctx.state.data = newRequest.getBytes();
    return true;
};

const connectionNotInited: InvokeErrorPolicy = async (e, ctx) => {
    if (e.message !== "CONNECTION_NOT_INITED") {
        return false;
    }
    const targetSender = ctx.sender || ctx.client._sender;
    if (targetSender) {
        targetSender._needsInitConnection = true;
    }
    ctx.client._log.warn(
        "CONNECTION_NOT_INITED, will re-wrap next request with initConnection"
    );
    return true;
};

const INVOKE_ERROR_POLICIES: InvokeErrorPolicy[] = [
    telegramInternalErrors,
    floodWait,
    dcMigration,
    msgWait,
    reCaptcha,
    connectionNotInited,
];

export async function invoke<R extends Api.AnyRequest>(
    client: TelegramClient,
    request: R,
    dcId?: number,
    otherSender?: MTProtoSender | SessionLease
): Promise<R["__response"]> {
    if (request.classType !== "request") {
        throw new Error("You can only invoke MTProtoRequests");
    }
    let sender = client._sender;
    let lease: SessionLease | undefined;
    if (dcId) {
        lease = await client._leaseSender(dcId);
        sender = lease.sender;
    }
    if (otherSender != undefined) {
        sender =
            otherSender instanceof MTProtoSender
                ? otherSender
                : (otherSender as unknown as SessionLease).sender;
    }
    if (sender == undefined) {
        throw new Error(
            "Cannot send requests while disconnected. You need to call .connect()"
        );
    }

    if (sender.userDisconnected) {
        throw new Error(
            "Cannot send requests while disconnected. Please reconnect."
        );
    }

    const ctx: InvokeAttempt = { client, request, state: undefined!, dcId, sender };
    try {
        await client._connectedDeferred.promise;

        await request.resolve(client, utils);
        client._lastRequest = new Date().getTime();
        const state = new RequestState(request);
        ctx.state = state;
        ctx.lease = lease;

        let attempt: number = 0;
        for (attempt = 0; attempt < client._requestRetries; attempt++) {
            ctx.sender.addStateToQueue(state);

            try {
                const result = await state.promise;
                state.finished.resolve();
                try {
                    await client.session.processEntities(result);
                } catch (err) {
                    client._log.warn(`session.processEntities failed: ${err}`);
                }
                client._entityCache.add(result);

                if (!dcId && !otherSender) {
                    const sub = (result as { SUBCLASS_OF_ID?: number })
                        ?.SUBCLASS_OF_ID;
                    if (sub === unionId("Updates")) {
                        client.updateManager.onUpdates(
                            result as Api.TypeUpdates,
                            true
                        );
                    } else if (
                        sub === unionId("messages.AffectedMessages") ||
                        sub === unionId("messages.AffectedHistory") ||
                        sub === unionId("messages.AffectedFoundMessages")
                    ) {
                        const affected = result as {
                            pts: number;
                            ptsCount: number;
                        };
                        const channel = (
                            request as unknown as {
                                channel?: { channelId?: bigInt.BigInteger };
                            }
                        ).channel;
                        client.updateManager.applyAffected(
                            affected.pts,
                            affected.ptsCount,
                            channel?.channelId?.toString()
                        );
                    }
                }

                return result;
            } catch (e: any) {
                let recovered = false;
                for (const policy of INVOKE_ERROR_POLICIES) {
                    try {
                        recovered = await policy(e, ctx);
                    } catch (fatal) {
                        state.finished.resolve();
                        throw fatal;
                    }
                    if (recovered) break;
                }
                if (!recovered) {
                    state.finished.resolve();
                    throw e;
                }
                lease = ctx.lease;
            }
            state.resetPromise();
        }
        throw new Error(`Request was unsuccessful ${attempt} time(s)`);
    } finally {
        (ctx.lease ?? lease)?.release();
    }
}

/**
 * Returns the current user as an {@link Api.User}, or as an {@link Api.InputPeerUser}
 * if `inputPeer` is `true` (useful when only the input peer is needed without a full API call).
 *
 * The result is cached after the first call.
 * @hidden
 */
export async function getMe<
    T extends boolean,
    R = T extends true ? Api.InputPeerUser : Api.User
>(client: TelegramClient, inputPeer: T): Promise<R> {
    if (inputPeer && client._selfInputPeer) {
        return client._selfInputPeer as unknown as R;
    }
    const me = (
        await client.api.users.getUsers({ id: [new Api.InputUserSelf()] })
    )[0] as Api.User;
    client._bot = me.bot;

    if (!client._selfInputPeer) {
        client._selfInputPeer = utils.getInputPeer(
            me,
            false
        ) as Api.InputPeerUser;
    }
    return inputPeer
        ? (client._selfInputPeer as unknown as R)
        : (me as unknown as R);
}

/** @hidden */
export async function isBot(client: TelegramClient) {
    if (client._bot === undefined) {
        const me = await client.getMe();
        if (me) {
            return !(me instanceof Api.InputPeerUser) ? me.bot : undefined;
        }
    }
    return client._bot;
}

/** @hidden */
export async function isUserAuthorized(client: TelegramClient) {
    try {
        await client.api.updates.getState();
        return true;
    } catch (e) {
        return false;
    }
}

/**
 * Resolves one or more entity-like values into their full {@link Entity} objects
 * by calling the appropriate Telegram API methods (`users.GetUsers`, `messages.GetChats`,
 * `channels.GetChannels`).
 *
 * @param client - The Telegram client instance.
 * @param entity - A single entity or array of entities to resolve (usernames, IDs, peers, etc.).
 * @returns A single entity if a single value was given, or an array of entities.
 * @hidden
 */
export async function getEntity(
    client: TelegramClient,
    entity: EntityLike | EntityLike[]
): Promise<Entity | Entity[]> {
    const single = !isArrayLike(entity);
    let entityArray: EntityLike[] = [];
    if (isArrayLike<EntityLike>(entity)) {
        entityArray = entity;
    } else {
        entityArray.push(entity);
    }

    const inputs = [];
    for (const x of entityArray) {
        if (typeof x === "string") {
            const valid = parseID(x);
            if (valid) {
                inputs.push(await client.getInputEntity(valid));
            } else {
                inputs.push(x);
            }
        } else {
            inputs.push(await client.getInputEntity(x));
        }
    }
    const lists = new Map<number, any[]>([
        [_EntityType.USER, []],
        [_EntityType.CHAT, []],
        [_EntityType.CHANNEL, []],
    ]);
    for (const x of inputs) {
        try {
            lists.get(_entityType(x))!.push(x);
        } catch (e) {}
    }
    let users = lists.get(_EntityType.USER)!;
    let chats = lists.get(_EntityType.CHAT)!;
    let channels = lists.get(_EntityType.CHANNEL)!;

    if (users.length) {
        users = await client.api.users.getUsers({
            id: users,
        });
    }
    if (chats.length) {
        const chatIds = chats.map((x) => x.chatId);
        chats = (await client.api.messages.getChats({ id: chatIds })).chats;
    }
    if (channels.length) {
        channels = await _getChannelsWithCommunityFallback(client, channels);
    }
    const idEntity = new Map<string, any>();

    for (const user of users) {
        idEntity.set(peerUtils(user), user);
    }

    for (const channel of channels) {
        idEntity.set(peerUtils(channel), channel);
    }

    for (const chat of chats) {
        idEntity.set(peerUtils(chat), chat);
    }

    const result = [];
    for (const x of inputs) {
        if (typeof x === "string") {
            result.push(await _getEntityFromString(client, x));
        } else if (!(x instanceof Api.InputPeerSelf)) {
            result.push(idEntity.get(peerUtils(x)));
        } else {
            for (const [key, u] of idEntity.entries()) {
                if (u instanceof Api.User && u.self) {
                    result.push(u);
                    break;
                }
            }
        }
    }
    return single ? result[0] : result;
}

async function _getChannelsWithCommunityFallback(
    client: TelegramClient,
    inputs: Api.TypeInputChannel[]
): Promise<Api.TypeChat[]> {
    try {
        return (await client.api.channels.getChannels({ id: inputs })).chats;
    } catch (e: any) {
        if (e?.errorMessage !== "COMMUNITY_ID_INVALID") throw e;
    }
    const joined = await client.api.communities.getJoinedCommunities();
    const byId = new Map<string, Api.TypeChat>();
    for (const chat of joined.chats) {
        byId.set(chat.id.toString(), chat);
    }
    const resolved: Api.TypeChat[] = [];
    const rest: Api.TypeInputChannel[] = [];
    for (const input of inputs) {
        const id = (input as { channelId?: bigInt.BigInteger }).channelId;
        const hit = id && byId.get(id.toString());
        if (hit) resolved.push(hit);
        else rest.push(input);
    }
    if (rest.length) {
        resolved.push(
            ...(await client.api.channels.getChannels({ id: rest })).chats
        );
    }
    return resolved;
}

/**
 * Resolves an entity-like value into an {@link Api.TypeInputPeer}, using (in order):
 * 1. Direct InputPeer conversion
 * 2. In-memory entity cache
 * 3. Known strings ("me", "this", "self")
 * 4. Session (disk) cache
 * 5. Network lookup (username resolution, `users.GetUsers`, `channels.GetChannels`)
 *
 * @param client - The Telegram client instance.
 * @param peer - The entity to resolve (username, phone, ID, Peer object, etc.).
 * @returns The corresponding InputPeer.
 * @throws {Error} If the entity cannot be resolved by any means.
 * @hidden
 */
export async function getInputEntity(
    client: TelegramClient,
    peer: EntityLike
): Promise<Api.TypeInputPeer> {
    // Short-circuit if the input parameter directly maps to an InputPeer

    try {
        return utils.getInputPeer(peer);
        // eslint-disable-next-line no-empty
    } catch (e) {}
    // Next in priority is having a peer (or its ID) cached in-memory
    try {
        if (typeof peer == "string") {
            const valid = parseID(peer);
            if (valid) {
                const res = client._entityCache.get(peer);
                if (res) {
                    return res;
                }
            }
        }
        if (
            typeof peer === "number" ||
            typeof peer === "bigint" ||
            bigInt.isInstance(peer)
        ) {
            const res = client._entityCache.get(peer.toString());
            if (res) {
                return res;
            }
        }
        // unionId("Peer") == crc32(b'Peer')
        if (
            typeof peer == "object" &&
            !bigInt.isInstance(peer) &&
            peer.SUBCLASS_OF_ID === unionId("Peer")
        ) {
            const res = client._entityCache.get(utils.getPeerId(peer));
            if (res) {
                return res;
            }
        }
        // eslint-disable-next-line no-empty
    } catch (e) {}
    // Then come known strings that take precedence
    if (typeof peer == "string") {
        if (["me", "this", "self"].includes(peer)) {
            return new Api.InputPeerSelf();
        }
    }

    // No InputPeer, cached peer, or known string. Fetch from disk cache
    try {
        if (peer != undefined) {
            return await client.session.getInputEntity(peer);
        }
        // eslint-disable-next-line no-empty
    } catch (e) {}
    // Only network left to try
    if (typeof peer === "string") {
        return utils.getInputPeer(await _getEntityFromString(client, peer));
    }

    // If we're a bot and the user has messaged us privately users.getUsers
    // will work with accessHash = 0. Similar for channels.getChannels.
    // If we're not a bot but the user is in our contacts, it seems to work
    // regardless. These are the only two special-cased requests.
    if (typeof peer === "number") {
        peer = returnBigInt(peer);
    }
    peer = utils.getPeer(peer);
    if (peer instanceof Api.PeerUser) {
        const users = await client.api.users.getUsers({
            id: [
                new Api.InputUser({
                    userId: peer.userId,
                    accessHash: bigInt.zero,
                }),
            ],
        });
        if (users.length && !(users[0] instanceof Api.UserEmpty)) {
            // If the user passed a valid ID they expect to work for
            // channels but would be valid for users, we get UserEmpty.
            // Avoid returning the invalid empty input peer for that.
            //
            // We *could* try to guess if it's a channel first, and if
            // it's not, work as a chat and try to validate it through
            // another request, but that becomes too much work.
            return utils.getInputPeer(users[0]);
        }
    } else if (peer instanceof Api.PeerChat) {
        return new Api.InputPeerChat({
            chatId: peer.chatId,
        });
    } else if (peer instanceof Api.PeerChannel) {
        try {
            const channels = await client.api.channels.getChannels({
                id: [
                    new Api.InputChannel({
                        channelId: peer.channelId,
                        accessHash: bigInt.zero,
                    }),
                ],
            });

            return utils.getInputPeer(channels.chats[0]);
        } catch (e) {
            client._log.error("Error while resolving channel entity", e);
            if (client._errorHandler) {
                await client._errorHandler(e as Error);
            }
        }
    }
    throw new Error(
        `Could not find the input entity for ${JSON.stringify(peer)}.
         Please read https://` +
            "docs.teleproto.dev/concepts/entities to" +
            " find out more details."
    );
}

/** @hidden */
export async function _getEntityFromString(
    client: TelegramClient,
    string: string
) {
    const phone = utils.parsePhone(string);
    if (phone) {
        try {
            const result = await client.api.contacts.getContacts({
                hash: bigInt.zero,
            });
            if (!(result instanceof Api.contacts.ContactsNotModified)) {
                for (const user of result.users) {
                    if (user instanceof Api.User && user.phone === phone) {
                        return user;
                    }
                }
            }
        } catch (e: any) {
            if (e.errorMessage === "BOT_METHOD_INVALID") {
                throw new Error(
                    "Cannot get entity by phone number as a " +
                        "bot (try using integer IDs, not strings)"
                );
            }
            throw e;
        }
    }
    const id = utils.parseID(string);
    if (id != undefined) {
        return getInputEntity(client, id);
    } else if (["me", "this"].includes(string.toLowerCase())) {
        return client.getMe();
    } else {
        const { username, isInvite } = utils.parseUsername(string);
        if (isInvite) {
            const invite = await client.api.messages.checkChatInvite({
                hash: username,
            });
            if (invite instanceof Api.ChatInvite) {
                throw new Error(
                    "Cannot get entity from a channel (or group) " +
                        "that you are not part of. Join the group and retry"
                );
            } else if (invite instanceof Api.ChatInviteAlready) {
                return invite.chat;
            }
        } else if (username) {
            try {
                const result = await client.api.contacts.resolveUsername({
                    username: username,
                });
                const pid = utils.getPeerId(result.peer, false);
                if (result.peer instanceof Api.PeerUser) {
                    for (const x of result.users) {
                        if (returnBigInt(x.id).equals(returnBigInt(pid))) {
                            return x;
                        }
                    }
                } else {
                    for (const x of result.chats) {
                        if (returnBigInt(x.id).equals(returnBigInt(pid))) {
                            return x;
                        }
                    }
                }
            } catch (e: any) {
                if (e.errorMessage === "USERNAME_NOT_OCCUPIED") {
                    throw new Error(`No user has "${username}" as username`);
                }
                throw e;
            }
        }
    }
    throw new Error(`Cannot find any entity corresponding to "${string}"`);
}

/** @hidden */
export async function getPeerId(
    client: TelegramClient,
    peer: EntityLike,
    addMark = true
) {
    if (typeof peer == "string") {
        const valid = parseID(peer);
        if (valid) {
            return utils.getPeerId(peer, addMark);
        } else {
            peer = await client.getInputEntity(peer);
        }
    }
    if (
        typeof peer == "number" ||
        typeof peer == "bigint" ||
        bigInt.isInstance(peer)
    ) {
        return utils.getPeerId(peer, addMark);
    }
    if (peer.SUBCLASS_OF_ID == unionId("Peer") || peer.SUBCLASS_OF_ID == unionId("InputPeer")) {
        peer = await client.getInputEntity(peer);
    }
    if (peer instanceof Api.InputPeerSelf) {
        peer = await client.getMe(true);
    }
    return utils.getPeerId(peer, addMark);
}

/** @hidden */
export async function _getPeer(client: TelegramClient, peer: EntityLike) {
    if (!peer) {
        return undefined;
    }
    const [i, cls] = utils.resolveId(
        returnBigInt(await client.getPeerId(peer))
    );
    return new cls({
        userId: i,
        channelId: i,
        chatId: i,
    });
}

/** @hidden */
export async function _getInputDialog(client: TelegramClient, dialog: any) {
    try {
        if (dialog.SUBCLASS_OF_ID == unionId("InputDialogPeer")) {

            dialog.peer = await client.getInputEntity(dialog.peer);
            return dialog;
        } else if (dialog.SUBCLASS_OF_ID == unionId("InputPeer")) {

            return new Api.InputDialogPeer({
                peer: dialog,
            });
        }
    } catch (e) {}
    return new Api.InputDialogPeer({
        peer: dialog,
    });
}

/** @hidden */
export async function _getInputNotify(client: TelegramClient, notify: any) {
    try {
        if (notify.SUBCLASS_OF_ID == unionId("InputNotifyPeer")) {
            if (notify instanceof Api.InputNotifyPeer) {
                notify.peer = await client.getInputEntity(notify.peer);
            }
            return notify;
        }
    } catch (e) {}
    return new Api.InputNotifyPeer({
        peer: await client.getInputEntity(notify),
    });
}

/** @hidden */
export function _selfId(client: TelegramClient) {
    return client._selfInputPeer ? client._selfInputPeer.userId : undefined;
}
