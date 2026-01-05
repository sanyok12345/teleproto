import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { TypeSuggestedStarRefBots } from "../../types/payments/TypeSuggestedStarRefBots";

export class GetSuggestedStarRefBots extends MTProtoRequest {
    static CONSTRUCTOR_ID = 225134839;
    static SUBCLASS_OF_ID = 1880658499;
    static className = "payments.GetSuggestedStarRefBots";
    static classType = "request";

    flags?: number;
    orderByRevenue?: boolean;
    orderByDate?: boolean;
    peer?: EntityLike;
    offset!: string;
    limit!: number;

    constructor(args: { flags?: number, orderByRevenue?: boolean, orderByDate?: boolean, peer?: EntityLike, offset?: string, limit?: number } = {}) {
        super();
        this.flags = args.flags;
        this.orderByRevenue = args.orderByRevenue;
        this.orderByDate = args.orderByDate;
        this.peer = args.peer;
        this.offset = args.offset!;
        this.limit = args.limit!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(225134839, false);
        let flags = 0;
        if (this.orderByRevenue) { flags |= 1 << 0; }
        if (this.orderByDate) { flags |= 1 << 1; }
        writer.writeInt(flags, false);
        if (this.orderByRevenue !== undefined && this.orderByRevenue !== null) {
        }
        if (this.orderByDate !== undefined && this.orderByDate !== null) {
        }
        writer.write((this.peer! as any).getBytes());
        writer.tgWriteString(this.offset);
        writer.writeInt(this.limit);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeSuggestedStarRefBots {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetSuggestedStarRefBots {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _orderByRevenue = true;
            args.orderByRevenue = _orderByRevenue;
        } else {
            args.orderByRevenue = false;
        }
        if (args.flags & (1 << 1)) {
            const _orderByDate = true;
            args.orderByDate = _orderByDate;
        } else {
            args.orderByDate = false;
        }
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        const _offset = reader.tgReadString();
        args.offset = _offset;
        const _limit = reader.readInt();
        args.limit = _limit;
        return new GetSuggestedStarRefBots(args);
    }
}