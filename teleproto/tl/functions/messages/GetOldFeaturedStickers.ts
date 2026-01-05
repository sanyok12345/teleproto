import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeFeaturedStickers } from "../../types/messages/TypeFeaturedStickers";

export class GetOldFeaturedStickers extends MTProtoRequest {
    static CONSTRUCTOR_ID = 2127598753;
    static SUBCLASS_OF_ID = 638891810;
    static className = "messages.GetOldFeaturedStickers";
    static classType = "request";

    offset!: number;
    limit!: number;
    hash?: bigint;

    constructor(args: { offset?: number, limit?: number, hash?: bigint } = {}) {
        super();
        this.offset = args.offset!;
        this.limit = args.limit!;
        this.hash = args.hash;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2127598753, false);
        writer.writeInt(this.offset);
        writer.writeInt(this.limit);
        writer.writeLargeInt(this.hash!, 64);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeFeaturedStickers {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetOldFeaturedStickers {
        const args: any = {};
        const _offset = reader.readInt();
        args.offset = _offset;
        const _limit = reader.readInt();
        args.limit = _limit;
        const _hash = reader.readLargeInt(64);
        args.hash = _hash;
        return new GetOldFeaturedStickers(args);
    }
}