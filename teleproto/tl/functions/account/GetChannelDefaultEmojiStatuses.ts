import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeEmojiStatuses } from "../../types/account/TypeEmojiStatuses";

export class GetChannelDefaultEmojiStatuses extends MTProtoRequest {
    static CONSTRUCTOR_ID = 1999087573;
    static SUBCLASS_OF_ID = 3554674122;
    static className = "account.GetChannelDefaultEmojiStatuses";
    static classType = "request";

    hash?: bigint;

    constructor(args: { hash?: bigint } = {}) {
        super();
        this.hash = args.hash;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1999087573, false);
        writer.writeLargeInt(this.hash!, 64);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeEmojiStatuses {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetChannelDefaultEmojiStatuses {
        const args: any = {};
        const _hash = reader.readLargeInt(64);
        args.hash = _hash;
        return new GetChannelDefaultEmojiStatuses(args);
    }
}