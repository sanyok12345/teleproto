import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { TypeChats } from "../../types/messages/TypeChats";

export class GetCommonChats extends MTProtoRequest {
    static CONSTRUCTOR_ID = 3826032900;
    static SUBCLASS_OF_ID = 2580925204;
    static className = "messages.GetCommonChats";
    static classType = "request";

    userId!: EntityLike;
    maxId?: bigint;
    limit!: number;

    constructor(args: { userId?: EntityLike, maxId?: bigint, limit?: number } = {}) {
        super();
        this.userId = args.userId!;
        this.maxId = args.maxId;
        this.limit = args.limit!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3826032900, false);
        writer.write((this.userId as any).getBytes());
        writer.writeLargeInt(this.maxId!, 64);
        writer.writeInt(this.limit);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeChats {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetCommonChats {
        const args: any = {};
        const _userId = reader.tgReadObject();
        args.userId = _userId;
        const _maxId = reader.readLargeInt(64);
        args.maxId = _maxId;
        const _limit = reader.readInt();
        args.limit = _limit;
        return new GetCommonChats(args);
    }
}