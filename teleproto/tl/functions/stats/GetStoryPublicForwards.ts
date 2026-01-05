import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { TypePublicForwards } from "../../types/stats/TypePublicForwards";

export class GetStoryPublicForwards extends MTProtoRequest {
    static CONSTRUCTOR_ID = 2789441270;
    static SUBCLASS_OF_ID = 2804429329;
    static className = "stats.GetStoryPublicForwards";
    static classType = "request";

    peer?: EntityLike;
    id?: number;
    offset!: string;
    limit!: number;

    constructor(args: { peer?: EntityLike, id?: number, offset?: string, limit?: number } = {}) {
        super();
        this.peer = args.peer;
        this.id = args.id;
        this.offset = args.offset!;
        this.limit = args.limit!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2789441270, false);
        writer.write((this.peer! as any).getBytes());
        writer.writeInt(this.id!);
        writer.tgWriteString(this.offset);
        writer.writeInt(this.limit);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypePublicForwards {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetStoryPublicForwards {
        const args: any = {};
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        const _id = reader.readInt();
        args.id = _id;
        const _offset = reader.tgReadString();
        args.offset = _offset;
        const _limit = reader.readInt();
        args.limit = _limit;
        return new GetStoryPublicForwards(args);
    }
}