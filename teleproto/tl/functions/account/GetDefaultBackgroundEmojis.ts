import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeEmojiList } from "../../types/TypeEmojiList";

export class GetDefaultBackgroundEmojis extends MTProtoRequest {
    static CONSTRUCTOR_ID = 2785720782;
    static SUBCLASS_OF_ID = 3169807034;
    static className = "account.GetDefaultBackgroundEmojis";
    static classType = "request";

    hash?: bigint;

    constructor(args: { hash?: bigint } = {}) {
        super();
        this.hash = args.hash;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2785720782, false);
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

    static fromReader(reader: BinaryReader): GetDefaultBackgroundEmojis {
        const args: any = {};
        const _hash = reader.readLargeInt(64);
        args.hash = _hash;
        return new GetDefaultBackgroundEmojis(args);
    }
}