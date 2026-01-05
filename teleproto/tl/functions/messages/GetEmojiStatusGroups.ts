import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeEmojiGroups } from "../../types/messages/TypeEmojiGroups";

export class GetEmojiStatusGroups extends MTProtoRequest {
    static CONSTRUCTOR_ID = 785209037;
    static SUBCLASS_OF_ID = 2127189465;
    static className = "messages.GetEmojiStatusGroups";
    static classType = "request";

    hash?: number;

    constructor(args: { hash?: number } = {}) {
        super();
        this.hash = args.hash;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(785209037, false);
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

    static fromReader(reader: BinaryReader): GetEmojiStatusGroups {
        const args: any = {};
        const _hash = reader.readInt();
        args.hash = _hash;
        return new GetEmojiStatusGroups(args);
    }
}