import bigInt from "big-integer";
import { Api } from "../../tl";
import type { EntityLike } from "../../define";
import type { TelegramClient } from "../TelegramClient";
import type { EventBuilder } from "../../events/common";
import { _intoIdSet } from "../../events/common";
import { getPeerId } from "../../Utils";
import { isArrayLike } from "../../Helpers";
import type { UpdateState } from "./manager";
import { UpdateConnectionState } from "../../network";

/** Passes the update on. A handler that never calls it consumes the update. */
export type NextFn = () => Promise<void>;

/**
 * One link of the chain: receives the update and `next`.
 *
 * `next()` runs the handlers behind it and waits for them, so work can happen
 * before and after; returning without it ends the chain for that update.
 */
export type UpdateMiddleware<T = any> = (
    update: T,
    next: NextFn,
) => unknown | Promise<unknown>;

/** Removes whatever {@link ClientUpdates.use}, {@link ClientUpdates.on} or {@link ClientUpdates.watch} registered. */
export type Unsubscribe = () => void;

type BareUpdateName<K extends string> = K extends `Update${infer Rest}`
    ? Uncapitalize<Rest>
    : never;

/** Raw updates of the current layer keyed by schema name, derived from the generated API. */
export type UpdateByName = {
    [K in Api.TypeUpdate["className"]as BareUpdateName<K>]: Extract<
        Api.TypeUpdate,
        { className: K }
    >;
};

/**
 * Schema constructor without the `update` prefix: `updateNewChannelMessage` is
 * `"newChannelMessage"`. Plus `"connectionState"` for connection updates.
 */
export type UpdateName = (keyof UpdateByName & string) | "connectionState";

/** Anything the chain can carry: a raw update or a connection update. */
export type AnyUpdate = Api.TypeUpdate | UpdateConnectionState;

type UpdateFields = {
    className?: string;
    channelId?: bigInt.BigInteger;
    chatId?: bigInt.BigInteger;
    userId?: bigInt.BigInteger;
    peer?: Api.TypePeer;
    message?: { peerId?: Api.TypePeer };
    _entities?: Map<string, Api.TypeUser | Api.TypeChat>;
    state?: Record<string, unknown>;
};

const fieldsOf = (update: unknown): UpdateFields => (update ?? {}) as UpdateFields;

/** The update a handler subscribed to `Name` receives. */
export type UpdateOf<Name extends UpdateName> = Name extends keyof UpdateByName
    ? UpdateByName[Name]
    : UpdateConnectionState;

interface WatchEntry {
    chats: EntityLike[];
    channels: Set<string>;
    stopped: boolean;
    arming?: Promise<void>;
}

/** Options of {@link ClientUpdates.watch}. */
export interface WatchOptions {
    /**
     * Which updates to hand the handler - raw names or an event builder.
     * Defaults to new messages, i.e. `["newMessage", "newChannelMessage"]`.
     */
    events?: UpdateName | UpdateName[] | EventBuilder;
    /** Extra predicate; the handler runs only when it returns a truthy value. */
    func?: (update: AnyUpdate) => unknown | Promise<unknown>;
}

/** Filters accepted by {@link ClientUpdates.on}, mirroring the event builders. */
export interface OnOptions {
    /**
     * Only handle updates coming from these chats - a username, an id or an
     * entity. Updates that carry no peer at all (`updateDcOptions`,
     * `updatePrivacy` and the like) never match this filter.
     */
    chats?: EntityLike | EntityLike[];
    /** Treat `chats` as a blacklist instead of a whitelist. */
    blacklistChats?: boolean;
    /** Extra predicate; the handler runs only when it returns a truthy value. */
    func?: (update: AnyUpdate) => unknown | Promise<unknown>;
}

function nameOf(update: unknown): UpdateName | undefined {
    const className = fieldsOf(update).className;
    if (!className) {
        return update instanceof UpdateConnectionState
            ? "connectionState"
            : undefined;
    }
    const bare = className.startsWith("Update")
        ? className.slice("Update".length)
        : className;
    return (bare.charAt(0).toLowerCase() + bare.slice(1)) as UpdateName;
}

function expandShortMessage(
    update: unknown,
    selfId?: bigInt.BigInteger,
): Api.UpdateNewMessage | undefined {
    const short =
        update instanceof Api.UpdateShortMessage ||
        update instanceof Api.UpdateShortChatMessage;
    if (!short) return undefined;
    const peerId =
        update instanceof Api.UpdateShortMessage
            ? new Api.PeerUser({ userId: update.userId })
            : new Api.PeerChat({ chatId: update.chatId });
    const fromUser =
        update instanceof Api.UpdateShortMessage ? update.userId : update.fromId;
    return new Api.UpdateNewMessage({
        message: new Api.Message({
            out: update.out,
            mentioned: update.mentioned,
            mediaUnread: update.mediaUnread,
            silent: update.silent,
            id: update.id,
            peerId,
            fromId: new Api.PeerUser({
                userId: update.out && selfId ? selfId : fromUser,
            }),
            message: update.message,
            date: update.date,
            fwdFrom: update.fwdFrom,
            viaBotId: update.viaBotId,
            replyTo: update.replyTo,
            entities: update.entities,
            ttlPeriod: update.ttlPeriod,
        }),
        pts: update.pts,
        ptsCount: update.ptsCount,
    });
}

function peerOf(update: unknown): string | undefined {
    const fields = fieldsOf(update);
    const peer =
        fields.message?.peerId ??
        (fields.peer instanceof Api.PeerUser ||
            fields.peer instanceof Api.PeerChat ||
            fields.peer instanceof Api.PeerChannel
            ? fields.peer
            : undefined);
    if (peer) return getPeerId(peer);
    if (fields.channelId) {
        return getPeerId(new Api.PeerChannel({ channelId: fields.channelId }));
    }
    if (fields.chatId) {
        return getPeerId(new Api.PeerChat({ chatId: fields.chatId }));
    }
    if (fields.userId) {
        return getPeerId(new Api.PeerUser({ userId: fields.userId }));
    }
    return undefined;
}

/**
 * The update pipeline of a client, reachable as `client.updates`.
 *
 * Handlers form one chain: `next()` passes the update on, returning without it
 * consumes the update. {@link on} matches first, by raw schema name or by an
 * event builder; {@link watch} also keeps Telegram sending updates for the
 * chats it is given.
 *
 * A raw name gives the untouched `Api.TypeUpdate`, a builder gives its event
 * object. Direct and small-group messages arrive as the `updateShortMessage`
 * containers, which are not part of the `Update` union; the chain expands them,
 * so `"newMessage"` sees them too.
 *
 * Each update carries a `state` object for middleware to leave things in.
 * Throws go to {@link catch}, or to the client's error handler.
 *
 * `client.addEventHandler` keeps working and runs before this chain; a
 * `StopPropagation` there ends that loop only.
 *
 * @example
 * ```ts
 * client.updates.use(async (update, next) => {
 *     const started = Date.now();
 *     await next();
 *     console.log(`${update.className} handled in ${Date.now() - started}ms`);
 * });
 *
 * client.updates.on("newChannelMessage", (update) => {
 *     console.log(update.message.id);
 * }, { chats: ["durov"] });
 *
 * client.updates.on(new NewMessage({ pattern: /^\/start/ }), (event) =>
 *     event.message.reply({ message: "hi" }));
 *
 * const stop = client.updates.watch("obitoscasino", (update) =>
 *     console.log(update.message.id));
 * ```
 * @category Updates
 */
export class ClientUpdates {
    private readonly client: TelegramClient;
    private readonly chain: UpdateMiddleware[] = [];
    private readonly watches = new Set<WatchEntry>();
    private onError?: (error: Error, update?: AnyUpdate) => unknown;

    constructor(client: TelegramClient) {
        this.client = client;
    }

    /**
     * Adds a middleware to the end of the chain. It sees every update, so this
     * is the place for logging, timing or authentication.
     *
     * @param middleware - see {@link UpdateMiddleware}.
     * @returns A function that removes it.
     * @example
     * ```ts
     * client.updates.use(async (update, next) => {
     *     update.state.user = await db.findUser(update);
     *     await next();
     * });
     * ```
     */
    use<T = any>(middleware: UpdateMiddleware<T>): Unsubscribe {
        if (typeof middleware !== "function") {
            throw new TypeError("Update middleware must be a function");
        }
        this.chain.push(middleware as UpdateMiddleware);
        return () => this.remove(middleware as UpdateMiddleware);
    }

    /**
     * Handles updates of the given raw names, or the events of a builder.
     *
     * A raw name gives the untouched update typed as its schema class; a
     * builder gives that builder's event object, as `addEventHandler` does. An
     * array of handlers runs in order, each deciding with `next()` whether the
     * rest of them run.
     *
     * @param names - Raw update names, or an event builder.
     * @param handler - One handler or an ordered array of them.
     * @param options - Chat and predicate filters, see {@link OnOptions}.
     * @returns A function that removes the handler.
     * @example
     * ```ts
     * client.updates.on("newChannelMessage", (update) => console.log(update.message.id));
     * client.updates.on(["newMessage", "newChannelMessage"], handler);
     * client.updates.on("botCallbackQuery", [checkAuth, handleClick]);
     * client.updates.on("newChannelMessage", handler, { chats: ["durov"] });
     * client.updates.on(new NewMessage({}), (event) => event.message.reply({ message: "hi" }));
     * ```
     */
    on<Name extends UpdateName>(
        names: Name | Name[],
        handler:
            | UpdateMiddleware<UpdateOf<Name>>
            | UpdateMiddleware<UpdateOf<Name>>[],
        options?: OnOptions,
    ): Unsubscribe;
    on<T = any>(
        builder: EventBuilder,
        handler: UpdateMiddleware<T> | UpdateMiddleware<T>[],
    ): Unsubscribe;
    on(
        target: UpdateName | UpdateName[] | EventBuilder,
        handler: UpdateMiddleware | UpdateMiddleware[],
        options: OnOptions = {},
    ): Unsubscribe {
        const run = compose(handler);
        if (typeof target !== "string" && !Array.isArray(target)) {
            return this.use(this.builderMiddleware(target, run));
        }
        const names = new Set(
            (Array.isArray(target) ? target : [target]).map((name) =>
                name.charAt(0).toLowerCase() + name.slice(1),
            ),
        );
        const matchesChat = this.chatMatcher(options);
        return this.use(async (update, next) => {
            const name = nameOf(update);
            if (!name || !names.has(name)) return next();
            if (!(await matchesChat(update))) return next();
            if (options.func && !(await options.func(update))) return next();
            await run(update, next);
        });
    }

    /**
     * Handles updates from the given chats only, and keeps them coming.
     *
     * Telegram streams channel updates to a session only while it keeps the
     * channel open, so for channels the account is not a member of this is the
     * difference between receiving their messages and receiving nothing. Chats
     * that need no such subscription are simply filtered.
     *
     * Synchronous like {@link on}: resolving the chats and subscribing happen in
     * the background, waiting for the client to connect, so it can be called
     * before `start()`. A reconnect re-subscribes on its own. The poll runs at
     * the interval Telegram names in the difference, falling back to the
     * client's `channelPollInterval`.
     *
     * @param chats - Chats to listen to: usernames, ids or entities.
     * @param handler - Optional handler; without it only the subscription is kept.
     * @param options - Which updates to handle, see {@link WatchOptions}.
     * @returns A function that stops watching and removes the handler.
     * @example
     * ```ts
     * const stop = client.updates.watch(
     *     ["obitoscasino", "toporlive"],
     *     (update) => console.log(update.message.id),
     * );
     * stop();
     * ```
     */
    watch(
        chats: EntityLike | EntityLike[],
        handler?: UpdateMiddleware | UpdateMiddleware[],
        options: WatchOptions = {},
    ): Unsubscribe {
        const wanted = isArrayLike(chats)
            ? (chats as EntityLike[])
            : [chats as EntityLike];
        let offHandler: Unsubscribe | undefined;
        if (handler) {
            const events = options.events ?? ["newMessage", "newChannelMessage"];
            offHandler =
                typeof events === "string" || Array.isArray(events)
                    ? this.on(events as UpdateName[], handler as UpdateMiddleware, {
                        chats: wanted,
                        func: options.func,
                    })
                    : this.on(events, handler as UpdateMiddleware);
        }

        const entry: WatchEntry = {
            chats: wanted,
            channels: new Set(),
            stopped: false,
        };
        this.watches.add(entry);
        void this.arm(entry);

        return () => {
            if (entry.stopped) return;
            entry.stopped = true;
            this.watches.delete(entry);
            offHandler?.();
            for (const channelId of entry.channels) {
                this.client.updateManager.releaseChannel(channelId);
            }
            entry.channels.clear();
        };
    }

    private async arm(entry: WatchEntry): Promise<void> {
        if (entry.stopped || entry.arming) return;
        entry.arming = (async () => {
            await this.client._connectedDeferred.promise;
            for (const chat of entry.chats) {
                if (entry.stopped) return;
                const input = await this.client.getInputEntity(chat);
                if (!(input instanceof Api.InputPeerChannel)) continue;
                const channelId = input.channelId.toString();
                if (entry.channels.has(channelId)) continue;
                await this.client.updateManager.watchChannel(
                    channelId,
                    new Api.InputChannel({
                        channelId: input.channelId,
                        accessHash: input.accessHash,
                    }),
                );
                if (entry.stopped) {
                    this.client.updateManager.releaseChannel(channelId);
                    return;
                }
                entry.channels.add(channelId);
            }
        })();
        try {
            await entry.arming;
        } catch (e) {
            await this.reportError(e as Error, undefined);
        } finally {
            entry.arming = undefined;
        }
    }

    private rearmWatches(): void {
        const alive = new Set(this.client.updateManager.watchedChannelIds());
        for (const entry of this.watches) {
            if (entry.stopped) continue;
            for (const channelId of [...entry.channels]) {
                if (!alive.has(channelId)) entry.channels.delete(channelId);
            }
            if (entry.channels.size < entry.chats.length) void this.arm(entry);
        }
    }

    /** Ids of the channels currently kept alive by {@link watch}. */
    get watched(): string[] {
        return this.client.updateManager.watchedChannelIds();
    }

    /** Removes a middleware or handler from the chain. */
    off(middleware: UpdateMiddleware): void {
        this.remove(middleware);
    }

    /** Installs the handler for anything thrown inside the chain. */
    catch(handler: (error: Error, update?: AnyUpdate) => unknown): this {
        this.onError = handler;
        return this;
    }

    /** Everything currently registered, in call order. */
    get handlers(): readonly UpdateMiddleware[] {
        return [...this.chain];
    }

    /** A copy of the local update state: `pts`, `qts`, `date` and `seq`. */
    get state(): UpdateState | undefined {
        const state = this.client.updateManager.state;
        return state ? { ...state } : undefined;
    }

    /** Fetches everything missed since the last known state. */
    async catchUp(): Promise<void> {
        await this.client.updateManager.catchUp();
    }

    async _dispatch(update: AnyUpdate): Promise<void> {
        if (
            update instanceof UpdateConnectionState &&
            update.state === UpdateConnectionState.connected
        ) {
            this.rearmWatches();
        }
        if (!this.chain.length) return;
        const expanded = expandShortMessage(
            update,
            this.client._selfInputPeer?.userId,
        );
        if (expanded) {
            fieldsOf(expanded)._entities = fieldsOf(update)._entities;
            update = expanded;
        }
        if (update && typeof update === "object" && !("state" in update)) {
            Object.defineProperty(update, "state", {
                value: {},
                enumerable: false,
                writable: true,
            });
        }
        const chain = [...this.chain];
        const run = async (index: number): Promise<void> => {
            if (index >= chain.length) return;
            await chain[index]!(update, () => run(index + 1));
        };
        try {
            await run(0);
        } catch (e) {
            await this.reportError(e as Error, update);
        }
    }

    private remove(middleware: UpdateMiddleware): void {
        const index = this.chain.indexOf(middleware);
        if (index >= 0) this.chain.splice(index, 1);
    }

    private async reportError(error: Error, update?: AnyUpdate): Promise<void> {
        if (this.onError) {
            try {
                await this.onError(error, update);
                return;
            } catch (e) {
                error = e as Error;
            }
        }
        if (this.client._errorHandler) {
            await this.client._errorHandler(error);
            return;
        }
        this.client._log.error(`Error in the update chain: ${error}`);
    }

    private chatMatcher(
        options: OnOptions,
    ): (update: AnyUpdate) => Promise<boolean> {
        if (options.chats === undefined) return async () => true;
        let ids: Set<string> | undefined;
        const wanted = isArrayLike(options.chats)
            ? (options.chats as EntityLike[])
            : [options.chats as EntityLike];
        return async (update: AnyUpdate) => {
            if (!ids) {
                ids = new Set((await _intoIdSet(this.client, wanted)) ?? []);
            }
            const peer = peerOf(update);
            const listed = peer !== undefined && ids.has(peer);
            return options.blacklistChats ? !listed : listed;
        };
    }

    private builderMiddleware(
        builder: EventBuilder,
        run: UpdateMiddleware,
    ): UpdateMiddleware {
        builder.client = this.client;
        return async (update, next) => {
            if (!builder.resolved) await builder.resolve(this.client);
            let event = builder.build(
                update,
                undefined,
                this.client._selfInputPeer
                    ? this.client._selfInputPeer.userId
                    : undefined,
            );
            if (!event) return next();
            event._client = this.client;
            if ("_eventName" in event) {
                event._setClient(this.client);
                event.originalUpdate = update;
                event._entities = update._entities;
            }
            if (!(await builder.filter(event))) return next();
            await run(event, next);
        };
    }
}

function compose(handler: UpdateMiddleware | UpdateMiddleware[]): UpdateMiddleware {
    if (!Array.isArray(handler)) {
        if (typeof handler !== "function") {
            throw new TypeError("Update handler must be a function");
        }
        return handler;
    }
    const handlers = handler.slice();
    for (const item of handlers) {
        if (typeof item !== "function") {
            throw new TypeError("Update handler must be a function");
        }
    }
    return async (update, next) => {
        const run = async (index: number): Promise<void> => {
            if (index >= handlers.length) return next();
            await handlers[index]!(update, () => run(index + 1));
        };
        await run(0);
    };
}
