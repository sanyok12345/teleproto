import type { TelegramClient } from "./TelegramClient";
import type { Entity, EntityLike } from "../define";
import { Api } from "../tl";
import { getInputChannel, getPeerId } from "../Utils";
import { RequestIter } from "../requestIter";
import { TotalList } from "../Helpers";
import type { UpdateNotifySettingsParams } from "./account";

/** Options for creating a community around an initial chat or bot. */
export interface CreateCommunityParams {
    title: string;
    peer: EntityLike;
    about?: string;
    /** Hides the initial peer inside the community. */
    hidden?: boolean;
}

/** Makes a linked peer visible, hidden or removes its link. */
export type CommunityPeerLinkAction = "visible" | "hidden" | "deleted";

/** A linked peer with its resolved entity when supplied by Telegram. */
export type CommunityPeer = Api.CommunityPeer & { entity?: Entity };

/** A pending link request with its peer and requesting user. */
export type CommunityPeerLinkRequest = Api.CommunityPeerRequest & {
    entity?: Entity;
    requestedByUser?: Api.User;
};

/** Pagination options; limit zero fetches only the total count. */
export interface IterCommunityPeerLinkRequestsParams {
    /** Opaque cursor returned by communities.getPeerLinkRequests. */
    offset?: string;
    limit?: number;
    /** Minimum interval between page requests, in seconds. */
    waitTime?: number;
}

/** Full community details together with related users and chats. */
export type FullCommunity = Api.messages.ChatFull & {
    fullChat: Api.CommunityFull;
};

/** Creates a community and returns its entity. */
export async function createCommunity(
    client: TelegramClient,
    params: CreateCommunityParams
): Promise<Api.Community> {
    const result = await client.invoke(new Api.communities.Create({
        title: params.title,
        peer: await client.getInputEntity(params.peer),
        about: params.about,
        hidden: params.hidden,
    }));
    if (result instanceof Api.Updates || result instanceof Api.UpdatesCombined) {
        const community = result.chats.find(
            (chat): chat is Api.Community => chat instanceof Api.Community
        );
        if (community) return community;
    }
    throw new Error("Telegram did not return the created community");
}

/** Fetches full community details and linked peers. */
export async function getCommunity(
    client: TelegramClient,
    community: EntityLike
): Promise<FullCommunity> {
    const result = await client.invoke(new Api.channels.GetFullChannel({
        channel: getInputChannel(await client.getInputEntity(community)),
    }));
    if (!(result.fullChat instanceof Api.CommunityFull)) {
        throw new Error("The entity is not a community");
    }
    return result as FullCommunity;
}

/** Lists joined communities, retaining forbidden entries. */
export async function getJoinedCommunities(
    client: TelegramClient
): Promise<TotalList<Api.Community | Api.CommunityForbidden>> {
    const result = await client.invoke(new Api.communities.GetJoinedCommunities());
    const communities = new TotalList<Api.Community | Api.CommunityForbidden>();
    for (const chat of result.chats) {
        if (chat instanceof Api.Community || chat instanceof Api.CommunityForbidden) {
            communities.push(chat);
        }
    }
    communities.total = result instanceof Api.messages.ChatsSlice
        ? result.count
        : communities.length;
    return communities;
}

/** Lists linked peers with visibility and history access metadata. */
export async function getCommunityPeers(
    client: TelegramClient,
    community: EntityLike
): Promise<CommunityPeer[]> {
    const result = await getCommunity(client, community);
    const entities = new Map<string, Entity>(
        [...result.chats, ...result.users].map((entity) => [getPeerId(entity), entity])
    );
    return result.fullChat.linkedPeers.map((peer) => Object.assign(peer, {
        entity: entities.get(getPeerId(peer.peer)),
    }));
}

/** Adds, changes visibility of, or removes a peer link. */
export async function setCommunityPeerLink(
    client: TelegramClient,
    community: EntityLike,
    peer: EntityLike,
    action: CommunityPeerLinkAction
): Promise<boolean> {
    if (!["visible", "hidden", "deleted"].includes(action)) {
        throw new Error("Community peer link action must be visible, hidden or deleted");
    }
    return client.invoke(new Api.communities.TogglePeerLink({
        community: getInputChannel(await client.getInputEntity(community)),
        peer: await client.getInputEntity(peer),
        visible: action === "visible" || undefined,
        hidden: action === "hidden" || undefined,
        deleted: action === "deleted" || undefined,
    }));
}

/** Groups or expands the community in the dialog list. */
export async function setCommunityCollapsed(
    client: TelegramClient,
    community: EntityLike,
    collapsed: boolean
): Promise<Api.TypeUpdates> {
    return client.invoke(new Api.communities.ToggleCommunityCollapsedInDialogs({
        community: getInputChannel(await client.getInputEntity(community)),
        collapsed: collapsed || undefined,
    }));
}

/** Iterates pending peer links using Telegram’s opaque pagination cursor. */
export class CommunityPeerLinkRequestsIter extends RequestIter {
    private request?: Api.communities.GetPeerLinkRequests;
    private readonly offsets = new Set<string>();

    async _init({ community, offset }: { community: EntityLike; offset: string }) {
        this.offsets.clear();
        this.request = new Api.communities.GetPeerLinkRequests({
            community: getInputChannel(await this.client.getInputEntity(community)),
            offset,
            limit: Math.min(this.left || 1, 100),
        });
        if (this.left === 0) {
            this.total = (await this.client.invoke(this.request)).totalCount;
            return true;
        }
    }

    async _loadNextChunk(): Promise<boolean | undefined> {
        while (this.request) {
            const request = this.request;
            this.offsets.add(request.offset);
            request.limit = Math.min(this.left, 100);
            const result = await this.client.invoke(request);
            this.total = result.totalCount;
            const entities = new Map<string, Entity>(
                [...result.chats, ...result.users].map((entity) => [getPeerId(entity), entity])
            );
            const users = new Map(result.users.map((user) => [user.id.toString(), user]));
            for (const entry of result.requests) {
                const requestedBy = users.get(entry.requestedBy.toString());
                this.buffer!.push(Object.assign(entry, {
                    entity: entities.get(getPeerId(entry.peer)),
                    requestedByUser: requestedBy instanceof Api.User ? requestedBy : undefined,
                }));
            }
            if (!result.nextOffset || this.offsets.has(result.nextOffset)) {
                this.request = undefined;
                return true;
            }
            request.offset = result.nextOffset;
            if (this.buffer!.length) return undefined;
        }
        return true;
    }

    [Symbol.asyncIterator](): AsyncIterator<CommunityPeerLinkRequest> {
        return super[Symbol.asyncIterator]();
    }
}

/** Iterates pending links with requester and peer metadata. */
export function iterCommunityPeerLinkRequests(
    client: TelegramClient,
    community: EntityLike,
    params: IterCommunityPeerLinkRequestsParams = {}
): CommunityPeerLinkRequestsIter {
    return new CommunityPeerLinkRequestsIter(client, params.limit, {
        waitTime: params.waitTime,
    }, { community, offset: params.offset ?? "" });
}

/** Collects pending peer links and their total count. */
export async function getCommunityPeerLinkRequests(
    client: TelegramClient,
    community: EntityLike,
    params: IterCommunityPeerLinkRequestsParams = {}
): Promise<TotalList<CommunityPeerLinkRequest>> {
    return (await iterCommunityPeerLinkRequests(client, community, params).collect()) as TotalList<CommunityPeerLinkRequest>;
}

/** Approves a peer link request, or rejects it when approved is false. */
export async function setCommunityPeerLinkRequestApproval(
    client: TelegramClient,
    community: EntityLike,
    peer: EntityLike,
    approved: boolean
): Promise<boolean> {
    return client.invoke(new Api.communities.TogglePeerLinkRequestApproval({
        community: getInputChannel(await client.getInputEntity(community)),
        peer: await client.getInputEntity(peer),
        reject: !approved || undefined,
    }));
}

/** Approves or rejects all pending peer link requests. */
export async function setAllCommunityPeerLinkRequestsApproval(
    client: TelegramClient,
    community: EntityLike,
    approved: boolean
): Promise<boolean> {
    return client.invoke(new Api.communities.ToggleAllPeerLinkRequestApproval({
        community: getInputChannel(await client.getInputEntity(community)),
        reject: !approved || undefined,
    }));
}

/** Bans a participant across the community, or unbans when banned is false. */
export async function setCommunityParticipantBanned(
    client: TelegramClient,
    community: EntityLike,
    participant: EntityLike,
    banned: boolean
): Promise<boolean> {
    return client.invoke(new Api.communities.ToggleParticipantBanned({
        community: getInputChannel(await client.getInputEntity(community)),
        participant: await client.getInputEntity(participant),
        unban: !banned || undefined,
    }));
}

/** Returns the community chats a participant owns or has joined. */
export async function getCommunityParticipantJoinedChats(
    client: TelegramClient,
    community: EntityLike,
    participant: EntityLike
): Promise<Api.communities.ParticipantJoinedChats> {
    return client.invoke(new Api.communities.GetParticipantJoinedChats({
        community: getInputChannel(await client.getInputEntity(community)),
        participant: await client.getInputEntity(participant),
    }));
}

/** Pins or unpins the community's grouped dialog. */
export async function pinCommunity(
    client: TelegramClient,
    community: EntityLike,
    pinned = true
): Promise<boolean> {
    return client.invoke(new Api.messages.ToggleDialogPin({
        peer: new Api.InputDialogPeerCommunity({
            community: getInputChannel(await client.getInputEntity(community)),
        }) as unknown as Api.TypeEntityLike,
        pinned: pinned || undefined,
    }));
}

/** Fetches notification settings using the community notification scope. */
export async function getCommunityNotifySettings(client: TelegramClient, community: EntityLike) {
    return client.getNotifySettings(new Api.InputNotifyCommunity({
        community: getInputChannel(await client.getInputEntity(community)),
    }));
}

/** Updates notification settings for the community notification scope. */
export async function updateCommunityNotifySettings(
    client: TelegramClient,
    community: EntityLike,
    params: UpdateNotifySettingsParams
) {
    return client.updateNotifySettings(new Api.InputNotifyCommunity({
        community: getInputChannel(await client.getInputEntity(community)),
    }), params);
}
