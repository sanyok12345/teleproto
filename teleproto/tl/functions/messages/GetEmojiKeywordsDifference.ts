import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeEmojiKeywordsDifference } from "../../types/TypeEmojiKeywordsDifference";

export class GetEmojiKeywordsDifference extends MTProtoRequest {
    static CONSTRUCTOR_ID = 352892591;
    static SUBCLASS_OF_ID = 3531196018;
    static className = "messages.GetEmojiKeywordsDifference";
    static classType = "request";

    langCode?: string;
    fromVersion!: number;

    constructor(args: { langCode?: string, fromVersion?: number } = {}) {
        super();
        this.langCode = args.langCode;
        this.fromVersion = args.fromVersion!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(352892591, false);
        writer.tgWriteString(this.langCode!);
        writer.writeInt(this.fromVersion);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeEmojiKeywordsDifference {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetEmojiKeywordsDifference {
        const args: any = {};
        const _langCode = reader.tgReadString();
        args.langCode = _langCode;
        const _fromVersion = reader.readInt();
        args.fromVersion = _fromVersion;
        return new GetEmojiKeywordsDifference(args);
    }
}