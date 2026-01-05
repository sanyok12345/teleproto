import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeEmojiList } from "../../types/TypeEmojiList";

export class SearchCustomEmoji extends MTProtoRequest {
    static CONSTRUCTOR_ID = 739360983;
    static SUBCLASS_OF_ID = 3169807034;
    static className = "messages.SearchCustomEmoji";
    static classType = "request";

    emoticon!: string;
    hash?: bigint;

    constructor(args: { emoticon?: string, hash?: bigint } = {}) {
        super();
        this.emoticon = args.emoticon!;
        this.hash = args.hash;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(739360983, false);
        writer.tgWriteString(this.emoticon);
        writer.writeLargeInt(this.hash!, 64);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeEmojiList {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): SearchCustomEmoji {
        const args: any = {};
        const _emoticon = reader.tgReadString();
        args.emoticon = _emoticon;
        const _hash = reader.readLargeInt(64);
        args.hash = _hash;
        return new SearchCustomEmoji(args);
    }
}