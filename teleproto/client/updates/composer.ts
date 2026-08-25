import { Api } from "../../tl";
import type { EntityLike } from "../../define";
import type { TelegramClient } from "../TelegramClient";
import type { EventBuilder } from "../../events/common";
import { _intoIdSet } from "../../events/common";
import { getPeerId } from "../../Utils";
import { isArrayLike } from "../../Helpers";
import type { UpdateState } from "./manager";
import type { UpdateConnectionState } from "../../network";

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
    [K in Api.TypeUpdate["className"] as BareUpdateName<K>]: Extract<
        Api.TypeUpdate,
        { className: K }
    >;
};

export type UpdateName = (keyof UpdateByName & string) | "connectionState";

export type UpdateOf<Name extends UpdateName> = Name extends keyof UpdateByName
    ? UpdateByName[Name]
    : UpdateConnectionState;

export interface OnOptions {
    chats?: EntityLike | EntityLike[];
    blacklistChats?: boolean;
    func?: (update: any) => unknown | Promise<unknown>;
}

function nameOf(update: any): UpdateName | undefined {
    const className: string | undefined = update?.className;
    if (!className) {
        return update?.constructor?.name === "UpdateConnectionState"
            ? "connectionState"
            : undefined;
    }
    const bare = className.startsWith("Update")
        ? className.slice("Update".length)
        : className;
    return (bare.charAt(0).toLowerCase() + bare.slice(1)) as UpdateName;
}

function peerOf(update: any): string | undefined {
    const peer =
        update?.message?.peerId ??
        (update?.peer instanceof Api.PeerUser ||
            update?.peer instanceof Api.PeerChat ||
            update?.peer instanceof Api.PeerChannel
            ? update.peer
            : undefined);
    if (peer) return getPeerId(peer);
    if (update?.channelId) {
        return getPeerId(new Api.PeerChannel({ channelId: update.channelId }));
    }
    if (update?.chatId) {
        return getPeerId(new Api.PeerChat({ chatId: update.chatId }));
    }
    if (update?.userId) {
        return getPeerId(new Api.PeerUser({ userId: update.userId }));
    }
    return undefined;
}

export class ClientUpdates {
    private readonly client: TelegramClient;
    private readonly chain: UpdateMiddleware[] = [];
    private onError?: (error: Error, update: any) => unknown;

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

    off(middleware: UpdateMiddleware): void {
        this.remove(middleware);
    }

    catch(handler: (error: Error, update: any) => unknown): this {
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

    async _dispatch(update: any): Promise<void> {
        if (!this.chain.length) return;
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

    private async reportError(error: Error, update: any): Promise<void> {
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
    ): (update: any) => Promise<boolean> {
        if (options.chats === undefined) return async () => true;
        let ids: Set<string> | undefined;
        const wanted = isArrayLike(options.chats)
            ? (options.chats as EntityLike[])
            : [options.chats as EntityLike];
        return async (update: any) => {
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
