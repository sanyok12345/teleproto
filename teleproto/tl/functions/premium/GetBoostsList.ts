import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { TypeBoostsList } from "../../types/premium/TypeBoostsList";

export class GetBoostsList extends MTProtoRequest {
    static CONSTRUCTOR_ID = 1626764896;
    static SUBCLASS_OF_ID = 573941949;
    static className = "premium.GetBoostsList";
    static classType = "request";

    flags?: number;
    gifts?: boolean;
    peer?: EntityLike;
    offset!: string;
    limit!: number;

    constructor(args: { flags?: number, gifts?: boolean, peer?: EntityLike, offset?: string, limit?: number } = {}) {
        super();
        this.flags = args.flags;
        this.gifts = args.gifts;
        this.peer = args.peer;
        this.offset = args.offset!;
        this.limit = args.limit!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1626764896, false);
        let flags = 0;
        if (this.gifts) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        if (this.gifts !== undefined && this.gifts !== null) {
        }
        writer.write((this.peer! as any).getBytes());
        writer.tgWriteString(this.offset);
        writer.writeInt(this.limit);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeBoostsList {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetBoostsList {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _gifts = true;
            args.gifts = _gifts;
        } else {
            args.gifts = false;
        }
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        const _offset = reader.tgReadString();
        args.offset = _offset;
        const _limit = reader.readInt();
        args.limit = _limit;
        return new GetBoostsList(args);
    }
}