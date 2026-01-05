import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { TypeSavedMusic } from "../../types/users/TypeSavedMusic";

export class GetSavedMusic extends MTProtoRequest {
    static CONSTRUCTOR_ID = 2022539235;
    static SUBCLASS_OF_ID = 4162039351;
    static className = "users.GetSavedMusic";
    static classType = "request";

    id?: EntityLike;
    offset!: number;
    limit!: number;
    hash?: bigint;

    constructor(args: { id?: EntityLike, offset?: number, limit?: number, hash?: bigint } = {}) {
        super();
        this.id = args.id;
        this.offset = args.offset!;
        this.limit = args.limit!;
        this.hash = args.hash;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2022539235, false);
        writer.write((this.id! as any).getBytes());
        writer.writeInt(this.offset);
        writer.writeInt(this.limit);
        writer.writeLargeInt(this.hash!, 64);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeSavedMusic {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetSavedMusic {
        const args: any = {};
        const _id = reader.tgReadObject();
        args.id = _id;
        const _offset = reader.readInt();
        args.offset = _offset;
        const _limit = reader.readInt();
        args.limit = _limit;
        const _hash = reader.readLargeInt(64);
        args.hash = _hash;
        return new GetSavedMusic(args);
    }
}