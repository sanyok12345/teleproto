import type { TelegramClient } from "./TelegramClient";
import type { EntityLike, FileLike } from "../define";
import type { BigInteger } from "big-integer";
import { generateRandomBigInt } from "../Helpers";
import { Api } from "../tl";
import { _fileToMedia } from "./uploads";
import { _parseMessageText } from "./messageParse";

async function _toStoryMedia(
    client: TelegramClient,
    media: FileLike
): Promise<Api.TypeInputMedia> {
    const converted = await _fileToMedia(client, { file: media });
    if (!converted.media) {
        throw new Error(`Cannot use ${media} as story media`);
    }
    return converted.media;
}

/** Parameters for {@link sendStory}. */
export interface SendStoryParams {
    /** The story photo/video (path, Buffer, uploaded file, or raw {@link Api.TypeInputMedia}). */
    media: FileLike;
    /** Story caption. Parsed with the client parse mode. */
    caption?: string;
    /** Formatting entities for the caption. When provided, parsing is skipped. */
    entities?: Api.TypeMessageEntity[];
    /** Parse mode override for the caption. */
    parseMode?: any;
    /** Privacy rules for the story. Defaults to everyone. */
    privacyRules?: Api.TypeInputPrivacyRule[];
    /** Pin the story to the profile after it expires. */
    pinned?: boolean;
    /** Disallow forwarding/screenshotting the story. */
    noforwards?: boolean;
    /** Story lifetime in seconds (86400, 2×86400, 3×86400 or 7×86400; Premium only except 86400). */
    period?: number;
    /** Clickable areas over the story (locations, reactions, links…). */
    mediaAreas?: Api.TypeMediaArea[];
    /** When reposting: the peer the original story belongs to. */
    fwdFromId?: EntityLike;
    /** When reposting: the ID of the original story. */
    fwdFromStory?: number;
    /** Set when the reposted story was modified before sending. */
    fwdModified?: boolean;
    /** IDs of story albums to add the story to. */
    albums?: number[];
    /** Music track attached to the story. */
    music?: Api.TypeInputDocument;
}

/** @hidden */
export async function sendStory(
    client: TelegramClient,
    entity: EntityLike,
    params: SendStoryParams
) {
    const peer = await client.getInputEntity(entity);
    let caption = params.caption;
    let entities = params.entities;
    if (caption != undefined && entities == undefined) {
        [caption, entities] = await _parseMessageText(
            client,
            caption,
            params.parseMode
        );
    }
    return client.invoke(
        new Api.stories.SendStory({
            peer: peer,
            media: await _toStoryMedia(client, params.media),
            caption: caption,
            entities: entities,
            privacyRules: params.privacyRules ?? [
                new Api.InputPrivacyValueAllowAll(),
            ],
            pinned: params.pinned,
            noforwards: params.noforwards,
            period: params.period,
            mediaAreas: params.mediaAreas,
            fwdFromId: params.fwdFromId
                ? await client.getInputEntity(params.fwdFromId)
                : undefined,
            fwdFromStory: params.fwdFromStory,
            fwdModified: params.fwdModified,
            albums: params.albums,
            music: params.music,
            randomId: generateRandomBigInt(),
        })
    );
}

/** Parameters for {@link editStory}. Only the fields you set are changed. */
export interface EditStoryParams {
    /** New story media. */
    media?: FileLike;
    /** New caption. Parsed with the client parse mode. */
    caption?: string;
    /** Formatting entities for the caption. When provided, parsing is skipped. */
    entities?: Api.TypeMessageEntity[];
    /** Parse mode override for the caption. */
    parseMode?: any;
    /** New privacy rules. */
    privacyRules?: Api.TypeInputPrivacyRule[];
    /** New clickable areas. */
    mediaAreas?: Api.TypeMediaArea[];
    /** New music track. */
    music?: Api.TypeInputDocument;
}

/** @hidden */
export async function editStory(
    client: TelegramClient,
    entity: EntityLike,
    storyId: number,
    params: EditStoryParams
) {
    const peer = await client.getInputEntity(entity);
    let caption = params.caption;
    let entities = params.entities;
    if (caption != undefined && entities == undefined) {
        [caption, entities] = await _parseMessageText(
            client,
            caption,
            params.parseMode
        );
    }
    return client.invoke(
        new Api.stories.EditStory({
            peer: peer,
            id: storyId,
            media: params.media
                ? await _toStoryMedia(client, params.media)
                : undefined,
            caption: caption,
            entities: entities,
            privacyRules: params.privacyRules,
            mediaAreas: params.mediaAreas,
            music: params.music,
        })
    );
}

/** @hidden */
export async function deleteStories(
    client: TelegramClient,
    entity: EntityLike,
    ids: number | number[]
): Promise<number[]> {
    const peer = await client.getInputEntity(entity);
    return client.invoke(
        new Api.stories.DeleteStories({
            peer: peer,
            id: Array.isArray(ids) ? ids : [ids],
        })
    );
}

/** @hidden */
export async function toggleStoriesPinned(
    client: TelegramClient,
    entity: EntityLike,
    ids: number | number[],
    pinned: boolean = true
): Promise<number[]> {
    const peer = await client.getInputEntity(entity);
    return client.invoke(
        new Api.stories.TogglePinned({
            peer: peer,
            id: Array.isArray(ids) ? ids : [ids],
            pinned: pinned,
        })
    );
}

/** @hidden */
export async function canSendStory(
    client: TelegramClient,
    entity: EntityLike
): Promise<Api.stories.CanSendStoryCount> {
    const peer = await client.getInputEntity(entity);
    return client.api.stories.canSendStory({ peer: peer });
}

/** Parameters for {@link getAllStories}. */
export interface GetAllStoriesParams {
    /** Fetch the next chunk, using the `state` from the previous response. */
    next?: boolean;
    /** Fetch stories from peers whose stories are hidden from the main list. */
    hidden?: boolean;
    /** State token from the previous {@link Api.stories.AllStories} response. */
    state?: string;
}

/** @hidden */
export async function getAllStories(
    client: TelegramClient,
    params: GetAllStoriesParams = {}
): Promise<Api.stories.TypeAllStories> {
    return client.api.stories.getAllStories({
        next: params.next,
        hidden: params.hidden,
        state: params.state,
    });
}

/** @hidden */
export async function getPeerStories(
    client: TelegramClient,
    entity: EntityLike
): Promise<Api.stories.PeerStories> {
    const peer = await client.getInputEntity(entity);
    return client.api.stories.getPeerStories({ peer: peer });
}

/** @hidden */
export async function getStoriesByID(
    client: TelegramClient,
    entity: EntityLike,
    ids: number | number[]
): Promise<Api.stories.Stories> {
    const peer = await client.getInputEntity(entity);
    return client.api.stories.getStoriesByID({
        peer: peer,
        id: Array.isArray(ids) ? ids : [ids],
    });
}

/** Pagination parameters for {@link getPinnedStories}/{@link getStoriesArchive}. */
export interface GetStoriesPageParams {
    /** Only return stories with IDs lower than this one. */
    offsetId?: number;
    /** Maximum number of stories to return. */
    limit?: number;
}

/** @hidden */
export async function getPinnedStories(
    client: TelegramClient,
    entity: EntityLike,
    params: GetStoriesPageParams = {}
): Promise<Api.stories.Stories> {
    const peer = await client.getInputEntity(entity);
    return client.api.stories.getPinnedStories({
        peer: peer,
        offsetId: params.offsetId ?? 0,
        limit: params.limit ?? 100,
    });
}

/** @hidden */
export async function getStoriesArchive(
    client: TelegramClient,
    entity: EntityLike,
    params: GetStoriesPageParams = {}
): Promise<Api.stories.Stories> {
    const peer = await client.getInputEntity(entity);
    return client.api.stories.getStoriesArchive({
        peer: peer,
        offsetId: params.offsetId ?? 0,
        limit: params.limit ?? 100,
    });
}

/** @hidden */
export async function readStories(
    client: TelegramClient,
    entity: EntityLike,
    maxId?: number
): Promise<number[]> {
    const peer = await client.getInputEntity(entity);
    return client.api.stories.readStories({
        peer: peer,
        maxId: maxId ?? 0,
    });
}

/** @hidden */
export async function incrementStoryViews(
    client: TelegramClient,
    entity: EntityLike,
    ids: number | number[]
): Promise<boolean> {
    const peer = await client.getInputEntity(entity);
    return client.api.stories.incrementStoryViews({
        peer: peer,
        id: Array.isArray(ids) ? ids : [ids],
    });
}

/** Parameters for {@link getStoryViewsList}. */
export interface GetStoryViewsListParams {
    /** Only fetch views from your contacts. */
    justContacts?: boolean;
    /** Sort viewers that reacted first. */
    reactionsFirst?: boolean;
    /** Sort viewers that forwarded/reposted first. */
    forwardsFirst?: boolean;
    /** Search viewers by name. */
    search?: string;
    /** Pagination offset from the previous response's `nextOffset`. */
    offset?: string;
    /** Maximum number of viewers to return. */
    limit?: number;
}

/** @hidden */
export async function getStoryViewsList(
    client: TelegramClient,
    entity: EntityLike,
    storyId: number,
    params: GetStoryViewsListParams = {}
): Promise<Api.stories.StoryViewsList> {
    const peer = await client.getInputEntity(entity);
    return client.invoke(
        new Api.stories.GetStoryViewsList({
            peer: peer,
            id: storyId,
            justContacts: params.justContacts,
            reactionsFirst: params.reactionsFirst,
            forwardsFirst: params.forwardsFirst,
            q: params.search,
            offset: params.offset ?? "",
            limit: params.limit ?? 100,
        })
    );
}

/** @hidden */
export async function exportStoryLink(
    client: TelegramClient,
    entity: EntityLike,
    storyId: number
): Promise<Api.ExportedStoryLink> {
    const peer = await client.getInputEntity(entity);
    return client.api.stories.exportStoryLink({ peer: peer, id: storyId });
}

/** @hidden */
export async function sendStoryReaction(
    client: TelegramClient,
    entity: EntityLike,
    storyId: number,
    reaction?: string | BigInteger | Api.TypeReaction,
    params: { addToRecent?: boolean } = {}
) {
    const peer = await client.getInputEntity(entity);
    let resolved: Api.TypeReaction;
    if (reaction == undefined) {
        resolved = new Api.ReactionEmpty();
    } else if (typeof reaction === "string") {
        resolved = new Api.ReactionEmoji({ emoticon: reaction });
    } else if (
        reaction instanceof Api.ReactionEmoji ||
        reaction instanceof Api.ReactionCustomEmoji ||
        reaction instanceof Api.ReactionPaid ||
        reaction instanceof Api.ReactionEmpty
    ) {
        resolved = reaction;
    } else {
        resolved = new Api.ReactionCustomEmoji({
            documentId: reaction as BigInteger,
        });
    }
    return client.invoke(
        new Api.stories.SendReaction({
            peer: peer,
            storyId: storyId,
            reaction: resolved,
            addToRecent: params.addToRecent,
        })
    );
}
