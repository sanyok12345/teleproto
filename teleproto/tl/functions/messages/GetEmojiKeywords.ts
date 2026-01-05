import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeEmojiKeywordsDifference } from "../../types/TypeEmojiKeywordsDifference";

export class GetEmojiKeywords extends MTProtoRequest {
    static CONSTRUCTOR_ID = 899735650;
    static SUBCLASS_OF_ID = 3531196018;
    static className = "messages.GetEmojiKeywords";
    static classType = "request";

    langCode?: string;

    constructor(args: { langCode?: string } = {}) {
        super();
        this.langCode = args.langCode;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(899735650, false);
        writer.tgWriteString(this.langCode!);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeEmojiKeywordsDifference {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetEmojiKeywords {
        const args: any = {};
        const _langCode = reader.tgReadString();
        args.langCode = _langCode;
        return new GetEmojiKeywords(args);
    }
}