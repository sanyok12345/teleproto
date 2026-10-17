import type { FieldDef } from "./schema";

export type TlUtils = {
    getInputPeer: (value: unknown) => unknown;
    getInputChannel: (value: unknown) => unknown;
    getInputUser: (value: unknown) => unknown;
    getInputMedia: (value: unknown) => unknown;
    getInputPhoto: (value: unknown) => unknown;
    getInputMessage: (value: unknown) => unknown;
    getInputDocument: (value: unknown) => unknown;
    getInputChatPhoto: (value: unknown) => unknown;
};

export type TlClient = {
    getInputEntity: (value: unknown) => Promise<unknown>;
    _getInputDialog: (value: unknown) => Promise<unknown>;
    _getInputNotify: (value: unknown) => Promise<unknown>;
    getPeerId: (value: unknown, addMark: boolean) => Promise<unknown>;
};

const NAMED_CASTS = new Set(["chatId,int"]);
const TYPE_CASTS = new Set([
    "InputPeer",
    "InputChannel",
    "InputUser",
    "InputDialogPeer",
    "InputNotifyPeer",
    "InputMedia",
    "InputPhoto",
    "InputMessage",
    "InputDocument",
    "InputChatPhoto",
]);

export function inputCastOf(field: FieldDef): string | undefined {
    const named = `${field.name},${field.type}`;
    if (NAMED_CASTS.has(named)) return named;
    return TYPE_CASTS.has(field.type ?? "") ? (field.type as string) : undefined;
}

export async function castInput(utils: TlUtils, client: TlClient, value: unknown, cast: string): Promise<unknown> {
    switch (cast) {
        case "InputPeer":
            return utils.getInputPeer(await client.getInputEntity(value));
        case "InputChannel":
            return utils.getInputChannel(await client.getInputEntity(value));
        case "InputUser":
            return utils.getInputUser(await client.getInputEntity(value));
        case "InputDialogPeer":
            return client._getInputDialog(value);
        case "InputNotifyPeer":
            return client._getInputNotify(value);
        case "InputMedia":
            return utils.getInputMedia(value);
        case "InputPhoto":
            return utils.getInputPhoto(value);
        case "InputMessage":
            return utils.getInputMessage(value);
        case "InputDocument":
            return utils.getInputDocument(value);
        case "InputChatPhoto":
            return utils.getInputChatPhoto(value);
        case "chatId,int":
            return client.getPeerId(value, false);
        default:
            throw new Error("unsupported peer type : " + cast);
    }
}
