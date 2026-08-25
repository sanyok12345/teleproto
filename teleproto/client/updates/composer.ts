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

export type NextFn = () => Promise<void>;

export type UpdateMiddleware<T = any> = (
    update: T,
    next: NextFn,
) => unknown | Promise<unknown>;

export type Unsubscribe = () => void;

type BareUpdateName<K extends string> = K extends `Update${infer Rest}`
    ? Uncapitalize<Rest>
    : never;

export type UpdateByName = {
    [K in Api.TypeUpdate["className"]as BareUpdateName<K>]: Extract<
        Api.TypeUpdate,
        { className: K }
    >;
};

export type UpdateName = (keyof UpdateByName & string) | "connectionState";

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

export type UpdateOf<Name extends UpdateName> = Name extends keyof UpdateByName
    ? UpdateByName[Name]
    : UpdateConnectionState;

interface WatchEntry {
    chats: EntityLike[];
    channels: Set<string>;
    stopped: boolean;
    arming?: Promise<void>;
}

export interface WatchOptions {
    events?: UpdateName | UpdateName[] | EventBuilder;
    func?: (update: AnyUpdate) => unknown | Promise<unknown>;
}

export interface OnOptions {
    chats?: EntityLike | EntityLike[];
    blacklistChats?: boolean;
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

export class ClientUpdates {
    private readonly client: TelegramClient;
    private readonly chain: UpdateMiddleware[] = [];
    private readonly watches = new Set<WatchEntry>();
    private onError?: (error: Error, update?: AnyUpdate) => unknown;

    constructor(client: TelegramClient) {
        this.client = client;
    }

    use<T = any>(middleware: UpdateMiddleware<T>): Unsubscribe {
        if (typeof middleware !== "function") {
            throw new TypeError("Update middleware must be a function");
        }
        this.chain.push(middleware as UpdateMiddleware);
        return () => this.remove(middleware as UpdateMiddleware);
    }

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

    get watched(): string[] {
        return this.client.updateManager.watchedChannelIds();
    }

    off(middleware: UpdateMiddleware): void {
        this.remove(middleware);
    }

    catch(handler: (error: Error, update?: AnyUpdate) => unknown): this {
        this.onError = handler;
        return this;
    }

    get handlers(): readonly UpdateMiddleware[] {
        return [...this.chain];
    }

    get state(): UpdateState | undefined {
        const state = this.client.updateManager.state;
        return state ? { ...state } : undefined;
    }

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
