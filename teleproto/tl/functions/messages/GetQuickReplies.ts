import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeQuickReplies } from "../../types/messages/TypeQuickReplies";

export class GetQuickReplies extends MTProtoRequest {
    static CONSTRUCTOR_ID = 3565417128;
    static SUBCLASS_OF_ID = 4147636582;
    static className = "messages.GetQuickReplies";
    static classType = "request";

    hash?: bigint;

    constructor(args: { hash?: bigint } = {}) {
        super();
        this.hash = args.hash;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3565417128, false);
        writer.writeLargeInt(this.hash!, 64);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeQuickReplies {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetQuickReplies {
        const args: any = {};
        const _hash = reader.readLargeInt(64);
        args.hash = _hash;
        return new GetQuickReplies(args);
    }
}