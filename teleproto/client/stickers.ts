import type { TelegramClient } from "./TelegramClient";
import type { BigInteger } from "big-integer";
import bigInt from "big-integer";
import * as utils from "../Utils";
import { Api } from "../tl";

/** A sticker set reference: its short name (from the t.me/addstickers link) or a raw {@link Api.TypeInputStickerSet}. */
export type InputStickerSetLike = string | Api.TypeInputStickerSet;

function _toInputStickerSet(set: InputStickerSetLike): Api.TypeInputStickerSet {
    if (typeof set === "string") {
        return new Api.InputStickerSetShortName({ shortName: set });
    }
    return set;
}

/** @hidden */
export async function getStickerSet(
    client: TelegramClient,
    set: InputStickerSetLike
): Promise<Api.messages.TypeStickerSet> {
    return client.invoke(
        new Api.messages.GetStickerSet({
            stickerset: _toInputStickerSet(set),
            hash: 0,
        })
    );
}

/** @hidden */
export async function getAllStickers(
    client: TelegramClient
): Promise<Api.messages.TypeAllStickers> {
    return client.api.messages.getAllStickers({ hash: bigInt.zero });
}

/** @hidden */
export async function installStickerSet(
    client: TelegramClient,
    set: InputStickerSetLike,
    params: { archived?: boolean } = {}
): Promise<Api.messages.TypeStickerSetInstallResult> {
    return client.invoke(
        new Api.messages.InstallStickerSet({
            stickerset: _toInputStickerSet(set),
            archived: params.archived ?? false,
        })
    );
}

/** @hidden */
export async function uninstallStickerSet(
    client: TelegramClient,
    set: InputStickerSetLike
): Promise<boolean> {
    return client.invoke(
        new Api.messages.UninstallStickerSet({
            stickerset: _toInputStickerSet(set),
        })
    );
}

/** @hidden */
export async function getRecentStickers(
    client: TelegramClient,
    params: { attached?: boolean } = {}
): Promise<Api.messages.TypeRecentStickers> {
    return client.api.messages.getRecentStickers({
        hash: bigInt.zero,
        attached: params.attached,
    });
}

/** @hidden */
export async function saveRecentSticker(
    client: TelegramClient,
    document: Api.TypeInputDocument | Api.Document,
    params: { unsave?: boolean; attached?: boolean } = {}
): Promise<boolean> {
    return client.invoke(
        new Api.messages.SaveRecentSticker({
            id: utils.getInputDocument(document),
            unsave: params.unsave ?? false,
            attached: params.attached,
        })
    );
}

/** @hidden */
export async function clearRecentStickers(
    client: TelegramClient,
    params: { attached?: boolean } = {}
): Promise<boolean> {
    return client.api.messages.clearRecentStickers({
        attached: params.attached,
    });
}

/** @hidden */
export async function getFavedStickers(
    client: TelegramClient
): Promise<Api.messages.TypeFavedStickers> {
    return client.api.messages.getFavedStickers({ hash: bigInt.zero });
}

/** @hidden */
export async function faveSticker(
    client: TelegramClient,
    document: Api.TypeInputDocument | Api.Document,
    params: { unfave?: boolean } = {}
): Promise<boolean> {
    return client.invoke(
        new Api.messages.FaveSticker({
            id: utils.getInputDocument(document),
            unfave: params.unfave ?? false,
        })
    );
}

/** @hidden */
export async function getCustomEmojiDocuments(
    client: TelegramClient,
    documentIds: BigInteger[]
): Promise<Api.TypeDocument[]> {
    return client.api.messages.getCustomEmojiDocuments({
        documentId: documentIds,
    });
}
