import type { TelegramClient } from "./TelegramClient";
import type { EntityLike } from "../define";
import { TotalList } from "../Helpers";
import { RequestIter } from "../requestIter";
import { Api } from "../tl";

const _MAX_INVITES_CHUNK_SIZE = 100;
const _MAX_IMPORTERS_CHUNK_SIZE = 100;

/**
 * Extracts the hash from an invite link (`t.me/+hash`, `t.me/joinchat/hash`)
 * or returns the input unchanged if it is already a bare hash.
 * @hidden
 */
export function _parseInviteHash(link: string): string {
    const trimmed = link.trim();
    const match = trimmed.match(
        /(?:t\.me\/|telegram\.me\/|telegram\.dog\/)?(?:joinchat\/|\+)([a-zA-Z0-9_-]+)\/?$/
    );
    return match ? match[1] : trimmed;
}

/** Parameters for {@link exportChatInvite}. */
export interface ExportChatInviteParams {
    /** Human-readable title of the link (visible to admins only). */
    title?: string;
    /** Point in time when the link will expire. */
    expireDate?: number | Date;
    /** Maximum number of users that can join through this link. */
    usageLimit?: number;
    /** Whether joining via this link requires admin approval. */
    requestNeeded?: boolean;
    /** Legacy behavior: revoke the previous permanent link and create a new one. */
    legacyRevokePermanent?: boolean;
    /** Telegram Star subscription pricing for the link (paid channel subscriptions). */
    subscriptionPricing?: Api.TypeStarsSubscriptionPricing;
}

function _toDate(value: number | Date | undefined): number | undefined {
    return value instanceof Date
        ? Math.floor(value.getTime() / 1000)
        : value;
}

/** @hidden */
export async function exportChatInvite(
    client: TelegramClient,
    entity: EntityLike,
    params: ExportChatInviteParams = {}
): Promise<Api.TypeExportedChatInvite> {
    const peer = await client.getInputEntity(entity);
    return client.invoke(
        new Api.messages.ExportChatInvite({
            peer: peer,
            title: params.title,
            expireDate: _toDate(params.expireDate),
            usageLimit: params.usageLimit,
            requestNeeded: params.requestNeeded,
            legacyRevokePermanent: params.legacyRevokePermanent,
            subscriptionPricing: params.subscriptionPricing,
        })
    );
}

/** Parameters for {@link editExportedChatInvite}. */
export interface EditExportedChatInviteParams {
    /** Revoke the link, preventing further joins. */
    revoked?: boolean;
    /** New expiration date. */
    expireDate?: number | Date;
    /** New usage limit. */
    usageLimit?: number;
    /** Whether joining via this link should require admin approval. */
    requestNeeded?: boolean;
    /** New link title. */
    title?: string;
}

/** @hidden */
export async function editExportedChatInvite(
    client: TelegramClient,
    entity: EntityLike,
    link: string,
    params: EditExportedChatInviteParams
): Promise<Api.messages.TypeExportedChatInvite> {
    const peer = await client.getInputEntity(entity);
    return client.invoke(
        new Api.messages.EditExportedChatInvite({
            peer: peer,
            link: link,
            revoked: params.revoked,
            expireDate: _toDate(params.expireDate),
            usageLimit: params.usageLimit,
            requestNeeded: params.requestNeeded,
            title: params.title,
        })
    );
}

/** @hidden */
export async function getExportedChatInvite(
    client: TelegramClient,
    entity: EntityLike,
    link: string
): Promise<Api.messages.TypeExportedChatInvite> {
    const peer = await client.getInputEntity(entity);
    return client.api.messages.getExportedChatInvite({
        peer: peer,
        link: link,
    });
}

/** @hidden */
export async function deleteExportedChatInvite(
    client: TelegramClient,
    entity: EntityLike,
    link: string
): Promise<boolean> {
    const peer = await client.getInputEntity(entity);
    return client.api.messages.deleteExportedChatInvite({
        peer: peer,
        link: link,
    });
}

/** @hidden */
export async function deleteRevokedExportedChatInvites(
    client: TelegramClient,
    entity: EntityLike,
    admin?: EntityLike
): Promise<boolean> {
    const peer = await client.getInputEntity(entity);
    const adminId = admin
        ? await client.getInputEntity(admin)
        : new Api.InputUserSelf();
    return client.invoke(
        new Api.messages.DeleteRevokedExportedChatInvites({
            peer: peer,
            adminId: adminId as unknown as Api.TypeInputUser,
        })
    );
}

/** @hidden */
export async function getAdminsWithInvites(
    client: TelegramClient,
    entity: EntityLike
): Promise<Api.messages.ChatAdminsWithInvites> {
    const peer = await client.getInputEntity(entity);
    return client.api.messages.getAdminsWithInvites({ peer: peer });
}

/** Parameters for {@link iterExportedChatInvites}/{@link getExportedChatInvites}. */
export interface ExportedChatInvitesParams {
    /** How many links to retrieve. Defaults to all. */
    limit?: number;
    /** Only fetch revoked links. */
    revoked?: boolean;
    /** Only fetch links created by this admin. Defaults to yourself. */
    admin?: EntityLike;
}

export class _ExportedChatInvitesIter extends RequestIter {
    private request?: Api.messages.GetExportedChatInvites;

    async _init(params: { entity: EntityLike } & ExportedChatInvitesParams) {
        const peer = await this.client.getInputEntity(params.entity);
        const adminId = params.admin
            ? await this.client.getInputEntity(params.admin)
            : new Api.InputUserSelf();
        this.request = new Api.messages.GetExportedChatInvites({
            peer: peer,
            adminId: adminId as unknown as Api.TypeInputUser,
            revoked: params.revoked,
            limit: 0,
        });
    }

    async _loadNextChunk() {
        if (!this.request) {
            return true;
        }
        this.request.limit = Math.min(this.left, _MAX_INVITES_CHUNK_SIZE);
        const result = await this.client.invoke(this.request);
        this.total = result.count;
        if (!result.invites.length) {
            return true;
        }
        for (const invite of result.invites) {
            this.buffer?.push(invite);
        }
        const last = result.invites[result.invites.length - 1];
        if (!(last instanceof Api.ChatInviteExported)) {
            return true;
        }
        this.request.offsetDate = last.date;
        this.request.offsetLink = last.link;
        if (result.invites.length < this.request.limit) {
            return true;
        }
    }

    [Symbol.asyncIterator](): AsyncIterator<
        Api.TypeExportedChatInvite,
        any,
        undefined
    > {
        return super[Symbol.asyncIterator]();
    }
}

/** @hidden */
export function iterExportedChatInvites(
    client: TelegramClient,
    entity: EntityLike,
    params: ExportedChatInvitesParams = {}
) {
    return new _ExportedChatInvitesIter(
        client,
        params.limit ?? Number.MAX_SAFE_INTEGER,
        {},
        { entity: entity, ...params }
    );
}

/** @hidden */
export async function getExportedChatInvites(
    client: TelegramClient,
    entity: EntityLike,
    params: ExportedChatInvitesParams = {}
) {
    return (await iterExportedChatInvites(
        client,
        entity,
        params
    ).collect()) as TotalList<Api.TypeExportedChatInvite>;
}

/** Parameters for {@link iterChatInviteImporters}/{@link getChatInviteImporters}. */
export interface ChatInviteImportersParams {
    /** How many importers to retrieve. Defaults to all. */
    limit?: number;
    /** Only fetch users that joined via this specific link. */
    link?: string;
    /** Only fetch pending join requests instead of joined users. */
    requested?: boolean;
    /** Only fetch users whose channel subscription has expired. */
    subscriptionExpired?: boolean;
    /** Search for a user by name. */
    search?: string;
}

export class _ChatInviteImportersIter extends RequestIter {
    private request?: Api.messages.GetChatInviteImporters;

    async _init(params: { entity: EntityLike } & ChatInviteImportersParams) {
        const peer = await this.client.getInputEntity(params.entity);
        this.request = new Api.messages.GetChatInviteImporters({
            peer: peer,
            link: params.link,
            requested: params.requested,
            subscriptionExpired: params.subscriptionExpired,
            q: params.search,
            offsetDate: 0,
            offsetUser: new Api.InputUserEmpty(),
            limit: 0,
        });
    }

    async _loadNextChunk() {
        if (!this.request) {
            return true;
        }
        this.request.limit = Math.min(this.left, _MAX_IMPORTERS_CHUNK_SIZE);
        const result = await this.client.invoke(this.request);
        this.total = result.count;
        if (!result.importers.length) {
            return true;
        }
        for (const importer of result.importers) {
            this.buffer?.push(importer);
        }
        const last = result.importers[result.importers.length - 1];
        this.request.offsetDate = last.date;
        this.request.offsetUser = (await this.client.getInputEntity(
            last.userId
        )) as unknown as Api.TypeInputUser;
        if (result.importers.length < this.request.limit) {
            return true;
        }
    }

    [Symbol.asyncIterator](): AsyncIterator<
        Api.ChatInviteImporter,
        any,
        undefined
    > {
        return super[Symbol.asyncIterator]();
    }
}

/** @hidden */
export function iterChatInviteImporters(
    client: TelegramClient,
    entity: EntityLike,
    params: ChatInviteImportersParams = {}
) {
    return new _ChatInviteImportersIter(
        client,
        params.limit ?? Number.MAX_SAFE_INTEGER,
        {},
        { entity: entity, ...params }
    );
}

/** @hidden */
export async function getChatInviteImporters(
    client: TelegramClient,
    entity: EntityLike,
    params: ChatInviteImportersParams = {}
) {
    return (await iterChatInviteImporters(
        client,
        entity,
        params
    ).collect()) as TotalList<Api.ChatInviteImporter>;
}

/** @hidden */
export async function hideChatJoinRequest(
    client: TelegramClient,
    entity: EntityLike,
    user: EntityLike,
    params: { approved?: boolean } = {}
) {
    const peer = await client.getInputEntity(entity);
    const userId = await client.getInputEntity(user);
    return client.invoke(
        new Api.messages.HideChatJoinRequest({
            peer: peer,
            userId: userId as unknown as Api.TypeInputUser,
            approved: params.approved,
        })
    );
}

/** @hidden */
export async function hideAllChatJoinRequests(
    client: TelegramClient,
    entity: EntityLike,
    params: { approved?: boolean; link?: string } = {}
) {
    const peer = await client.getInputEntity(entity);
    return client.invoke(
        new Api.messages.HideAllChatJoinRequests({
            peer: peer,
            approved: params.approved,
            link: params.link,
        })
    );
}

/** @hidden */
export async function checkChatInvite(
    client: TelegramClient,
    link: string
): Promise<Api.TypeChatInvite> {
    return client.api.messages.checkChatInvite({
        hash: _parseInviteHash(link),
    });
}
