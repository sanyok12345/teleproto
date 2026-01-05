import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { TypeMessages } from "../../types/messages/TypeMessages";

export class GetRecentLocations extends MTProtoRequest {
    static CONSTRUCTOR_ID = 1881817312;
    static SUBCLASS_OF_ID = 3568569182;
    static className = "messages.GetRecentLocations";
    static classType = "request";

    peer?: EntityLike;
    limit!: number;
    hash?: bigint;

    constructor(args: { peer?: EntityLike, limit?: number, hash?: bigint } = {}) {
        super();
        this.peer = args.peer;
        this.limit = args.limit!;
        this.hash = args.hash;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1881817312, false);
        writer.write((this.peer! as any).getBytes());
        writer.writeInt(this.limit);
        writer.writeLargeInt(this.hash!, 64);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeMessages {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetRecentLocations {
        const args: any = {};
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        const _limit = reader.readInt();
        args.limit = _limit;
        const _hash = reader.readLargeInt(64);
        args.hash = _hash;
        return new GetRecentLocations(args);
    }
}