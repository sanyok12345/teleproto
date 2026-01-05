import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeMyStickers } from "../../types/messages/TypeMyStickers";

export class GetMyStickers extends MTProtoRequest {
    static CONSTRUCTOR_ID = 3501580796;
    static SUBCLASS_OF_ID = 2981377290;
    static className = "messages.GetMyStickers";
    static classType = "request";

    offsetId!: bigint;
    limit!: number;

    constructor(args: { offsetId?: bigint, limit?: number } = {}) {
        super();
        this.offsetId = args.offsetId!;
        this.limit = args.limit!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3501580796, false);
        writer.writeLargeInt(this.offsetId, 64);
        writer.writeInt(this.limit);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeMyStickers {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetMyStickers {
        const args: any = {};
        const _offsetId = reader.readLargeInt(64);
        args.offsetId = _offsetId;
        const _limit = reader.readInt();
        args.limit = _limit;
        return new GetMyStickers(args);
    }
}