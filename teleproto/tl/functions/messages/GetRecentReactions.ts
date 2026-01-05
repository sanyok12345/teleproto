import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeReactions } from "../../types/messages/TypeReactions";

export class GetRecentReactions extends MTProtoRequest {
    static CONSTRUCTOR_ID = 960896434;
    static SUBCLASS_OF_ID = 2915271460;
    static className = "messages.GetRecentReactions";
    static classType = "request";

    limit!: number;
    hash?: bigint;

    constructor(args: { limit?: number, hash?: bigint } = {}) {
        super();
        this.limit = args.limit!;
        this.hash = args.hash;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(960896434, false);
        writer.writeInt(this.limit);
        writer.writeLargeInt(this.hash!, 64);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeReactions {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetRecentReactions {
        const args: any = {};
        const _limit = reader.readInt();
        args.limit = _limit;
        const _hash = reader.readLargeInt(64);
        args.hash = _hash;
        return new GetRecentReactions(args);
    }
}