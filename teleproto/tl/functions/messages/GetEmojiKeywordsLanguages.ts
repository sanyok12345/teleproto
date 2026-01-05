import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeEmojiLanguage } from "../../types/TypeEmojiLanguage";

export class GetEmojiKeywordsLanguages extends MTProtoRequest {
    static CONSTRUCTOR_ID = 1318675378;
    static SUBCLASS_OF_ID = 3885355911;
    static className = "messages.GetEmojiKeywordsLanguages";
    static classType = "request";

    langCodes!: string[];

    constructor(args: { langCodes?: string[] } = {}) {
        super();
        this.langCodes = args.langCodes!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1318675378, false);
        writer.writeVector(this.langCodes, (item) => {
            writer.tgWriteString(item);
        });
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeEmojiLanguage[] {
        const result = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetEmojiKeywordsLanguages {
        const args: any = {};
        const _langCodes = reader.readVector((reader) => {
            const item = reader.tgReadString();
            return item;
        });
        args.langCodes = _langCodes;
        return new GetEmojiKeywordsLanguages(args);
    }
}