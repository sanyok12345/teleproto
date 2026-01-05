import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { TypePhotos } from "../../types/photos/TypePhotos";

export class GetUserPhotos extends MTProtoRequest {
    static CONSTRUCTOR_ID = 2446144168;
    static SUBCLASS_OF_ID = 667924839;
    static className = "photos.GetUserPhotos";
    static classType = "request";

    userId!: EntityLike;
    offset!: number;
    maxId?: bigint;
    limit!: number;

    constructor(args: { userId?: EntityLike, offset?: number, maxId?: bigint, limit?: number } = {}) {
        super();
        this.userId = args.userId!;
        this.offset = args.offset!;
        this.maxId = args.maxId;
        this.limit = args.limit!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2446144168, false);
        writer.write((this.userId as any).getBytes());
        writer.writeInt(this.offset);
        writer.writeLargeInt(this.maxId!, 64);
        writer.writeInt(this.limit);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypePhotos {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetUserPhotos {
        const args: any = {};
        const _userId = reader.tgReadObject();
        args.userId = _userId;
        const _offset = reader.readInt();
        args.offset = _offset;
        const _maxId = reader.readLargeInt(64);
        args.maxId = _maxId;
        const _limit = reader.readInt();
        args.limit = _limit;
        return new GetUserPhotos(args);
    }
}