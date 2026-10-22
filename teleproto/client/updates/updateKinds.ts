import type bigInt from "big-integer";
import { Api } from "../../tl";
import * as utils from "../../Utils";

export type PtsUpdate = Api.TypeUpdate & { pts: number; ptsCount: number };

export type EntityMap = Map<string, Api.TypeUser | Api.TypeChat>;

export interface DispatchPayload {
    others: Api.TypeUpdate[] | null;
    entities?: EntityMap;
}

export function isCommonPtsUpdate(update: Api.TypeUpdate): update is PtsUpdate {
    return (
        update instanceof Api.UpdateNewMessage ||
        update instanceof Api.UpdateDeleteMessages ||
        update instanceof Api.UpdateReadHistoryInbox ||
        update instanceof Api.UpdateReadHistoryOutbox ||
        update instanceof Api.UpdateWebPage ||
        update instanceof Api.UpdateReadMessagesContents ||
        update instanceof Api.UpdateEditMessage ||
        update instanceof Api.UpdateFolderPeers ||
        update instanceof Api.UpdatePinnedMessages
    );
}

export function isChannelPtsUpdate(update: Api.TypeUpdate): update is PtsUpdate {
    return (
        update instanceof Api.UpdateNewChannelMessage ||
        update instanceof Api.UpdateEditChannelMessage ||
        update instanceof Api.UpdateDeleteChannelMessages ||
        update instanceof Api.UpdateChannelWebPage ||
        update instanceof Api.UpdatePinnedChannelMessages
    );
}

export function hasQts(update: Api.TypeUpdate): update is Api.TypeUpdate & { qts: number } {
    return typeof (update as { qts?: unknown }).qts === "number";
}

export function channelIdOf(update: Api.TypeUpdate): string | undefined {
    const fields = update as { channelId?: bigInt.BigInteger; message?: { peerId?: unknown } };
    if (fields.channelId) return fields.channelId.toString();
    const peer = fields.message?.peerId;
    return peer instanceof Api.PeerChannel ? peer.channelId.toString() : undefined;
}

export function requestChannelId(request: unknown): string | undefined {
    let current = request as { classType?: string; peer?: unknown; channel?: unknown; query?: unknown } | undefined;
    while (current?.classType === "request") {
        const target = current.peer ?? current.channel;
        if (
            target instanceof Api.InputPeerChannel ||
            target instanceof Api.InputChannel ||
            target instanceof Api.InputPeerChannelFromMessage ||
            target instanceof Api.InputChannelFromMessage
        ) {
            return target.channelId.toString();
        }
        current = current.query as typeof current;
    }
    return undefined;
}

export function collectEntities(users: Api.TypeUser[], chats: Api.TypeChat[]): EntityMap {
    const entities: EntityMap = new Map();
    for (const entity of [...users, ...chats]) {
        try {
            entities.set(utils.getPeerId(entity), entity);
        } catch {}
    }
    return entities;
}

export function isMessage(message: Api.TypeMessage): message is Api.Message | Api.MessageService {
    return message instanceof Api.Message || message instanceof Api.MessageService;
}

export function nextRetryDelaySeconds(previous: number): number {
    if (!previous) return 1;
    if (previous >= 32) return 60 + Math.random() * 20;
    return previous * 2;
}
