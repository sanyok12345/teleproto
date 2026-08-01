import type { TelegramClient } from "./TelegramClient";
import type { EntityLike } from "../define";
import type { BigInteger } from "big-integer";
import { generateRandomBigInt } from "../Helpers";
import { Api } from "../tl";

/** Parameters for {@link createForumTopic}. */
export interface CreateForumTopicParams {
    /** The topic title. */
    title: string;
    /** RGB color of the fallback topic icon. */
    iconColor?: number;
    /** ID of a custom emoji to use as the topic icon. */
    iconEmojiId?: BigInteger;
    /** Create the topic without a name (direct-messages channels). */
    titleMissing?: boolean;
    /** Send the topic-creation message as a specific peer. */
    sendAs?: EntityLike;
}

/** @hidden */
export async function createForumTopic(
    client: TelegramClient,
    entity: EntityLike,
    params: CreateForumTopicParams
) {
    const peer = await client.getInputEntity(entity);
    return client.invoke(
        new Api.messages.CreateForumTopic({
            peer: peer,
            title: params.title,
            iconColor: params.iconColor,
            iconEmojiId: params.iconEmojiId,
            titleMissing: params.titleMissing,
            randomId: generateRandomBigInt(),
            sendAs: params.sendAs
                ? await client.getInputEntity(params.sendAs)
                : undefined,
        })
    );
}

/** Parameters for {@link editForumTopic}. Only the fields you set are changed. */
export interface EditForumTopicParams {
    /** New topic title. */
    title?: string;
    /** ID of a custom emoji to use as the new topic icon. Pass `0` as BigInteger to remove it. */
    iconEmojiId?: BigInteger;
    /** Close or reopen the topic. */
    closed?: boolean;
    /** Hide or unhide the topic (only for the "General" topic). */
    hidden?: boolean;
}

/** @hidden */
export async function editForumTopic(
    client: TelegramClient,
    entity: EntityLike,
    topicId: number,
    params: EditForumTopicParams
) {
    const peer = await client.getInputEntity(entity);
    return client.invoke(
        new Api.messages.EditForumTopic({
            peer: peer,
            topicId: topicId,
            title: params.title,
            iconEmojiId: params.iconEmojiId,
            closed: params.closed,
            hidden: params.hidden,
        })
    );
}

/** @hidden */
export async function updatePinnedForumTopic(
    client: TelegramClient,
    entity: EntityLike,
    topicId: number,
    pinned: boolean
) {
    const peer = await client.getInputEntity(entity);
    return client.invoke(
        new Api.messages.UpdatePinnedForumTopic({
            peer: peer,
            topicId: topicId,
            pinned: pinned,
        })
    );
}

/** @hidden */
export async function reorderPinnedForumTopics(
    client: TelegramClient,
    entity: EntityLike,
    order: number[],
    params: { force?: boolean } = {}
) {
    const peer = await client.getInputEntity(entity);
    return client.invoke(
        new Api.messages.ReorderPinnedForumTopics({
            peer: peer,
            order: order,
            force: params.force,
        })
    );
}

/** Parameters for {@link getForumTopics}. */
export interface GetForumTopicsParams {
    /** Search query for topic titles. */
    search?: string;
    /** Offset date for pagination. */
    offsetDate?: number;
    /** Offset message ID for pagination. */
    offsetId?: number;
    /** Offset topic ID for pagination. */
    offsetTopic?: number;
    /** Maximum number of topics to return. */
    limit?: number;
}

/** @hidden */
export async function getForumTopics(
    client: TelegramClient,
    entity: EntityLike,
    params: GetForumTopicsParams = {}
): Promise<Api.messages.ForumTopics> {
    const peer = await client.getInputEntity(entity);
    return client.invoke(
        new Api.messages.GetForumTopics({
            peer: peer,
            q: params.search,
            offsetDate: params.offsetDate ?? 0,
            offsetId: params.offsetId ?? 0,
            offsetTopic: params.offsetTopic ?? 0,
            limit: params.limit ?? 100,
        })
    );
}

/** @hidden */
export async function getForumTopicsByID(
    client: TelegramClient,
    entity: EntityLike,
    topicIds: number | number[]
): Promise<Api.messages.ForumTopics> {
    const peer = await client.getInputEntity(entity);
    return client.invoke(
        new Api.messages.GetForumTopicsByID({
            peer: peer,
            topics: Array.isArray(topicIds) ? topicIds : [topicIds],
        })
    );
}

/** @hidden */
export async function toggleForum(
    client: TelegramClient,
    entity: EntityLike,
    enabled: boolean,
    tabs: boolean = false
) {
    const channel = await client.getInputEntity(entity);
    return client.api.channels.toggleForum({
        channel: channel,
        enabled: enabled,
        tabs: tabs,
    });
}

/** @hidden */
export async function toggleViewForumAsMessages(
    client: TelegramClient,
    entity: EntityLike,
    enabled: boolean
) {
    const channel = await client.getInputEntity(entity);
    return client.api.channels.toggleViewForumAsMessages({
        channel: channel,
        enabled: enabled,
    });
}
