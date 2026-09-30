import bigInt from "big-integer";
import { setMaxListeners } from "events";
import { Api } from "../../tl";
import type { EntityLike } from "../../define";
import type { TelegramClient } from "../TelegramClient";
import type { EventBuilder } from "../../events/common";
import { _intoIdSet } from "../../events/common";
import { getPeerId } from "../../Utils";
import { isArrayLike } from "../../Helpers";
import type { UpdateState, ChannelPollingState } from "./manager";
import { UpdateConnectionState } from "../../network";
import { UpdateContext, type WithUpdateContext } from "./context";
import { _dispatchUpdate } from "./dispatch";

/** Passes the update on. A handler that never calls it consumes the update. */
export type NextFn = () => Promise<void>;

/**
 * One link of the chain: receives the update and `next`.
 *
 * `next()` runs the handlers behind it and waits for them, so work can happen
 * before and after; returning without it ends the chain for that update.
 */
export type UpdateMiddleware<T = any> = (
    update: WithUpdateContext<T>,
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
    peer?: Api.TypePeer | Api.TypeDialogPeer | Api.TypeNotifyPeer;
    message?: { peerId?: Api.TypePeer };
    _entities?: Map<string, Api.TypeUser | Api.TypeChat>;
    state?: Record<string, unknown>;
};

const fieldsOf = (update: unknown): UpdateFields => (update ?? {}) as UpdateFields;

/** The update a handler subscribed to `Name` receives. */
export type UpdateOf<Name extends UpdateName> = WithUpdateContext<
    Name extends keyof UpdateByName ? UpdateByName[Name] : UpdateConnectionState
>;

interface WatchEntry {
    chats: EntityLike[];
    channels: Set<string>;
    stopped: boolean;
    arming?: Promise<void>;
    controller: AbortController;
    retryTimer?: ReturnType<typeof setTimeout>;
    retryDelay: number;
}

/** Options of {@link ClientUpdates.watch}. */
export interface WatchOptions {
    /** Receives matching updates independently of the middleware chain. Defaults to false. */
    independent?: boolean;
    /**
     * Which updates to hand the handler - raw names or an event builder.
     * Defaults to new messages, i.e. `["newMessage", "newChannelMessage"]`.
     */
    events?: UpdateName | UpdateName[] | EventBuilder;
    /** Extra predicate; the handler runs only when it returns a truthy value. */
    func?: (update: WithUpdateContext<AnyUpdate>) => unknown | Promise<unknown>;
}

/** Filters accepted by {@link ClientUpdates.on}, mirroring the event builders. */
export interface OnOptions {
    /** Bypasses the middleware chain; `next()` only advances this registration's handler array. */
    independent?: boolean;
    /**
     * Only handle updates coming from these chats - a username, an id or an
     * entity. Updates that carry no peer at all (`updateDcOptions`,
     * `updatePrivacy` and the like) never match this filter.
     */
    chats?: EntityLike | EntityLike[];
    /** Treat `chats` as a blacklist instead of a whitelist. */
    blacklistChats?: boolean;
    /** Extra predicate; the handler runs only when it returns a truthy value. */
    func?: (update: WithUpdateContext<AnyUpdate>) => unknown | Promise<unknown>;
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
    if (
        fields.peer instanceof Api.DialogPeerCommunity ||
        fields.peer instanceof Api.NotifyCommunity
    ) {
        return getPeerId(new Api.PeerChannel({ channelId: fields.peer.communityId }));
    }
    const peer =
        fields.message?.peerId ??
        (fields.peer instanceof Api.DialogPeer || fields.peer instanceof Api.NotifyPeer
            ? fields.peer.peer : undefined) ??
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
 * event builder; {@link watch} also polls channel differences for the chats
 * it is given.
 * `independent: true` registrations run alongside this chain and cannot consume each other's updates.
 *
 * A raw name gives the original `Api.TypeUpdate`, a builder gives its event
 * object. Direct and small-group messages arrive as the `updateShortMessage`
 * containers, which are not part of the `Update` union; the chain expands them,
 * so `"newMessage"` sees them too.
 *
 * Each update carries a `state` object for middleware to leave things in.
 * `context` exposes `chatId`, `chat`, `getChat()`, `inputChat` and `client`
 * without changing TL fields or the second argument, `next()`.
 * `chat` uses attached entities; only `getChat()` may fetch a missing chat.
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
    private readonly independent = new Set<UpdateMiddleware>();
    private readonly registrations = new Map<UpdateMiddleware, UpdateMiddleware[]>();
    private readonly watches = new Set<WatchEntry>();
    private onError?: (error: Error, update?: AnyUpdate) => unknown;
    private blockedAuthorization?: Error;

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
        if (this.client._destroyed) throw new Error("Cannot subscribe to a destroyed client");
        if (typeof middleware !== "function") {
            throw new TypeError("Update middleware must be a function");
        }
        this.chain.push(middleware as UpdateMiddleware);
        return () => this.remove(middleware as UpdateMiddleware);
    }

    /**
     * Handles updates of the given raw names, or the events of a builder.
     *
     * A raw name gives the original update typed as its schema class; a
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
        options?: OnOptions,
    ): Unsubscribe;
    on(
        target: UpdateName | UpdateName[] | EventBuilder,
        handler: UpdateMiddleware | UpdateMiddleware[],
        options: OnOptions = {},
    ): Unsubscribe {
        const run = compose(handler);
        if (typeof target !== "string" && !Array.isArray(target)) {
            return this.register(this.builderMiddleware(target, run, options), handler, options.independent);
        }
        const names = new Set(
            (Array.isArray(target) ? target : [target]).map((name) =>
                name.charAt(0).toLowerCase() + name.slice(1),
            ),
        );
        const matchesChat = this.chatMatcher(options);
        return this.register(async (update, next) => {
            const name = nameOf(update);
            if (!name || !names.has(name)) return next();
            if (!(await matchesChat(update))) return next();
            if (options.func && !(await options.func(update))) return next();
            await run(update, next);
        }, handler, options.independent);
    }

    /**
     * Handles updates from the given chats and polls channel differences.
     *
     * Registration is synchronous and may precede `start()`. Channels resume
     * from their saved pts after reconnect; unsubscribing releases their polling slot.
     * All channels share `channelPollRequestInterval` and `channelPollConcurrency`,
     * including channel initialization and difference pages. More channels increase
     * delay; server timeouts are minimum intervals, not delivery deadlines.
     * Without a server timeout, polling uses `channelPollInterval` (1000 ms by default).
     * Flood waits pause the shared budget. Inspect {@link polling} for queue delays.
     * Delayed polling may interrupt passive delivery from channels you have not joined;
     * differences resume while server history is available. No channel-count cap is imposed.
     * Expired history yields a recent snapshot, not every missed event.
     * Messages recovered from differences use synthetic updates with `pts = ptsCount = 0`.
     *
     * Read `update.context.chat` or await `update.context.getChat()` for the source chat.
     * Chat information is absent for updates without a peer.
     * Permanent authorization failures suspend polling and reach `catch` once.
     * Polling resumes after login or a successful `updates.getState` call; see {@link authorizationError}.
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
        handler?: UpdateMiddleware<UpdateOf<"newMessage" | "newChannelMessage">> | UpdateMiddleware<UpdateOf<"newMessage" | "newChannelMessage">>[],
        options?: WatchOptions & { events?: undefined },
    ): Unsubscribe;
    watch<Name extends UpdateName>(
        chats: EntityLike | EntityLike[],
        handler: UpdateMiddleware<UpdateOf<Name>> | UpdateMiddleware<UpdateOf<Name>>[],
        options: WatchOptions & { events: Name | Name[] },
    ): Unsubscribe;
    watch<T = any>(
        chats: EntityLike | EntityLike[],
        handler?: UpdateMiddleware<T> | UpdateMiddleware<T>[],
        options?: WatchOptions,
    ): Unsubscribe;
    watch(
        chats: EntityLike | EntityLike[],
        handler?: UpdateMiddleware | UpdateMiddleware[],
        options: WatchOptions = {},
    ): Unsubscribe {
        if (this.client._destroyed) throw new Error("Cannot subscribe to a destroyed client");
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
                        independent: options.independent,
                    })
                    : this.on(events, handler as UpdateMiddleware, {
                        chats: wanted,
                        func: options.func,
                        independent: options.independent,
                    });
        }

        const entry: WatchEntry = {
            chats: wanted,
            channels: new Set(),
            stopped: false,
            controller: watchController(),
            retryDelay: 1000,
        };
        this.watches.add(entry);
        void this.arm(entry);

        return () => {
            if (entry.stopped) return;
            entry.stopped = true;
            this.watches.delete(entry);
            offHandler?.();
            entry.controller.abort();
            if (entry.retryTimer) clearTimeout(entry.retryTimer);
            entry.channels.clear();
        };
    }

    private async arm(entry: WatchEntry): Promise<void> {
        if (entry.stopped || entry.arming || this.blockedAuthorization || !this.client.updateManager.isRunning) return;
        const controller = entry.controller;
        const active = () => !controller.signal.aborted && !entry.stopped;
        const task = (async () => {
            await this.client._connectedDeferred.promise;
            if (!active() || !this.client.updateManager.isRunning) return;
            let retry = false;
            const pending: Promise<void>[] = [];
            const pendingChannels = new Set<string>();
            const failed = async (error: unknown) => {
                if (!active()) return;
                if (this._suspendAuthorization(error)) return;
                const code = (error as { errorMessage?: string }).errorMessage;
                retry ||= !(error instanceof TypeError || error instanceof RangeError) &&
                    !["CHANNEL_PRIVATE", "CHANNEL_INVALID", "USERNAME_INVALID", "USERNAME_NOT_OCCUPIED", "PEER_ID_INVALID"].includes(code ?? "");
                await this.reportError(error as Error, undefined);
            };
            for (const chat of entry.chats) {
                if (!active()) return;
                try {
                    const input = await this.client.getInputEntity(chat);
                    if (!active()) return;
                    if (!(input instanceof Api.InputPeerChannel)) continue;
                    const channelId = input.channelId.toString();
                    if (entry.channels.has(channelId) || pendingChannels.has(channelId)) continue;
                    pendingChannels.add(channelId);
                    const subscription = this.client.updateManager.watchChannel(
                        channelId,
                        new Api.InputChannel({
                            channelId: input.channelId,
                            accessHash: input.accessHash,
                        }),
                        controller.signal,
                    );
                    pending.push(subscription.then(() => {
                        if (active()) entry.channels.add(channelId);
                    }).catch(failed));
                } catch (error) {
                    await failed(error);
                }
            }
            await Promise.all(pending);
            if (retry && active()) {
                entry.retryTimer = setTimeout(() => {
                    entry.retryTimer = undefined;
                    void this.arm(entry);
                }, entry.retryDelay);
                entry.retryTimer.unref?.();
                entry.retryDelay = Math.min(entry.retryDelay * 2, 64000);
            } else {
                entry.retryDelay = 1000;
            }
        })();
        entry.arming = task;
        try {
            await task;
        } catch (error) {
            this.client._log.error(`Error arming channel watch: ${error}`);
        } finally {
            if (entry.arming === task) entry.arming = undefined;
        }
    }

    /** @hidden */
    _pause(): void {
        for (const entry of this.watches) {
            entry.controller.abort();
            entry.controller = watchController();
            entry.channels.clear();
            entry.arming = undefined;
            if (entry.retryTimer) clearTimeout(entry.retryTimer);
            entry.retryTimer = undefined;
        }
    }

    /** @hidden */
    _resume(): void {
        if (this.blockedAuthorization) return;
        const alive = new Set(this.client.updateManager.watchedChannelIds());
        for (const entry of this.watches) {
            if (entry.stopped) continue;
            for (const channelId of [...entry.channels]) {
                if (!alive.has(channelId)) entry.channels.delete(channelId);
            }
            if (entry.retryTimer) clearTimeout(entry.retryTimer);
            entry.retryTimer = undefined;
            if (entry.channels.size < entry.chats.length) void this.arm(entry);
        }
    }

    /** Permanent authorization error that suspended polling; cleared after successful authorization. */
    get authorizationError(): Error | undefined {
        return this.blockedAuthorization;
    }

    /** @hidden */
    _suspendAuthorization(error: unknown): boolean {
        const code = (error as { errorMessage?: string })?.errorMessage;
        if (![
            "AUTH_KEY_UNREGISTERED", "AUTH_KEY_INVALID", "AUTH_KEY_DUPLICATED",
            "SESSION_REVOKED", "SESSION_EXPIRED", "USER_DEACTIVATED", "USER_DEACTIVATED_BAN",
        ].includes(code ?? "")) return false;
        if (!this.blockedAuthorization) {
            this.blockedAuthorization = error as Error;
            this._pause();
            void this.reportError(error as Error);
        }
        return true;
    }

    /** @hidden */
    _resumeAuthorization(): void {
        if (this.client._destroyed) return;
        this.blockedAuthorization = undefined;
        this._resume();
        void this.client.updateManager.catchUp();
    }

    /** Ids of channels registered for polling by {@link watch}, including pending initialization. */
    get watched(): string[] {
        return this.client.updateManager.watchedChannelIds();
    }

    /** Shared polling load and per-channel request timing; returns a detached snapshot. */
    get polling(): ChannelPollingState {
        return this.client.updateManager.polling;
    }

    /** Removes a middleware or handler from the chain. */
    off(middleware: UpdateMiddleware): void {
        this.remove(middleware);
        for (const [registered, handlers] of this.registrations) {
            if (handlers.includes(middleware)) this.remove(registered);
        }
    }

    /** Installs the handler for anything thrown inside the chain. */
    catch(handler: (error: Error, update?: AnyUpdate) => unknown): this {
        this.onError = handler;
        return this;
    }

    /** Registered chain handlers followed by independent subscriptions. */
    get handlers(): readonly UpdateMiddleware[] {
        return [...this.chain, ...this.independent];
    }

    /** @hidden */
    _destroy(): void {
        for (const entry of this.watches) {
            entry.stopped = true;
            entry.controller.abort();
            if (entry.retryTimer) clearTimeout(entry.retryTimer);
            entry.channels.clear();
        }
        this.watches.clear();
        this.chain.length = 0;
        this.independent.clear();
        this.registrations.clear();
        this.onError = undefined;
        this.blockedAuthorization = undefined;
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

    /** Delivers a local update without changing protocol checkpoints. In sequential mode, do not await this inside a handler. */
    async dispatch(
        update: AnyUpdate,
        peers?: ReadonlyMap<string, Api.TypeUser | Api.TypeChat>,
    ): Promise<void> {
        if (this.client._destroyed) throw new Error("Cannot dispatch through a destroyed client");
        if (peers) fieldsOf(update)._entities = new Map(peers);
        await _dispatchUpdate(this.client, { update });
    }

    async _dispatch(update: AnyUpdate): Promise<void> {
        if (
            update instanceof UpdateConnectionState &&
            update.state === UpdateConnectionState.connected
        ) {
            this._resume();
        }
        if (!this.chain.length && !this.independent.size) return;
        const expanded = expandShortMessage(
            update,
            this.client._selfInputPeer?.userId,
        );
        if (expanded) {
            fieldsOf(expanded)._entities = fieldsOf(update)._entities;
            update = expanded;
        }
        const message = fieldsOf(update).message;
        if ((message instanceof Api.Message || message instanceof Api.MessageService) &&
            message._client !== this.client) {
            message._finishInit(this.client, fieldsOf(update)._entities ?? new Map());
        }
        if (update && typeof update === "object" && !("state" in update)) {
            Object.defineProperty(update, "state", {
                value: {},
                enumerable: false,
                writable: true,
            });
        }
        this.attachContext(update);
        const chain = [...this.chain];
        const branches = [...this.independent];
        const deliver = async (handlers: UpdateMiddleware[]) => {
            try {
                await runChain(handlers, update, async () => {});
            } catch (e) {
                await this.reportError(e as Error, update);
            }
        };
        await Promise.all([deliver(chain), ...branches.map((handler) => deliver([handler]))]);
    }

    private attachContext(event: object, update: AnyUpdate = event as AnyUpdate): void {
        if ("context" in event) return;
        let context: UpdateContext | undefined;
        Object.defineProperty(event, "context", {
            get: () => context ??= new UpdateContext(
                this.client, peerOf(update), fieldsOf(update)._entities,
            ),
            enumerable: false,
        });
    }

    private register(
        middleware: UpdateMiddleware,
        handler: UpdateMiddleware | UpdateMiddleware[],
        independent = false,
    ): Unsubscribe {
        if (this.client._destroyed) throw new Error("Cannot subscribe to a destroyed client");
        this.registrations.set(middleware, Array.isArray(handler) ? handler.slice() : [handler]);
        if (independent) {
            this.independent.add(middleware);
            return () => this.remove(middleware);
        }
        return this.use(middleware);
    }

    private remove(middleware: UpdateMiddleware): void {
        this.registrations.delete(middleware);
        this.independent.delete(middleware);
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
            try {
                await this.client._errorHandler(error);
                return;
            } catch (handlerError) {
                error = handlerError as Error;
            }
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
        options: OnOptions,
    ): UpdateMiddleware {
        const matchesChat = this.chatMatcher(options);
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
                event.originalUpdate = update;
                event._entities = update._entities ?? new Map();
                event._setClient(this.client);
            }
            this.attachContext(event, update);
            if (!(await builder.filter(event))) return next();
            if (!(await matchesChat(update))) return next();
            if (options.func && !(await options.func(update))) return next();
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
    return (update, next) => runChain(handlers, update, next);
}

async function runChain(
    handlers: readonly UpdateMiddleware[],
    update: AnyUpdate,
    next: NextFn,
): Promise<void> {
    let last = -1;
    const run = async (index: number): Promise<void> => {
        if (index <= last) throw new Error("next() called multiple times");
        last = index;
        if (index >= handlers.length) return next();
        await handlers[index]!(update, () => run(index + 1));
    };
    await run(0);
}

function watchController(): AbortController {
    const controller = new AbortController();
    setMaxListeners(0, controller.signal);
    return controller;
}
