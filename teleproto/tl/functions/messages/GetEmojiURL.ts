import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeEmojiURL } from "../../types/TypeEmojiURL";

export class GetEmojiURL extends MTProtoRequest {
    static CONSTRUCTOR_ID = 3585149990;
    static SUBCLASS_OF_ID = 530614809;
    static className = "messages.GetEmojiURL";
    static classType = "request";

    langCode?: string;

    constructor(args: { langCode?: string } = {}) {
        super();
        this.langCode = args.langCode;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3585149990, false);
        writer.tgWriteString(this.langCode!);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeEmojiURL {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetEmojiURL {
        const args: any = {};
        const _langCode = reader.tgReadString();
        args.langCode = _langCode;
        return new GetEmojiURL(args);
    }
}