import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeEmojiGroups } from "../../types/messages/TypeEmojiGroups";

export class GetEmojiStickerGroups extends MTProtoRequest {
    static CONSTRUCTOR_ID = 500711669;
    static SUBCLASS_OF_ID = 2127189465;
    static className = "messages.GetEmojiStickerGroups";
    static classType = "request";

    hash?: number;

    constructor(args: { hash?: number } = {}) {
        super();
        this.hash = args.hash;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(500711669, false);
        writer.writeInt(this.hash!);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeEmojiGroups {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetEmojiStickerGroups {
        const args: any = {};
        const _hash = reader.readInt();
        args.hash = _hash;
        return new GetEmojiStickerGroups(args);
    }
}