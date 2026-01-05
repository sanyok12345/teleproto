import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { TypeStarsStatus } from "../../types/payments/TypeStarsStatus";

export class GetStarsTransactions extends MTProtoRequest {
    static CONSTRUCTOR_ID = 1775912279;
    static SUBCLASS_OF_ID = 1855724911;
    static className = "payments.GetStarsTransactions";
    static classType = "request";

    flags?: number;
    inbound?: boolean;
    outbound?: boolean;
    ascending?: boolean;
    ton?: boolean;
    subscriptionId?: string;
    peer?: EntityLike;
    offset!: string;
    limit!: number;

    constructor(args: { flags?: number, inbound?: boolean, outbound?: boolean, ascending?: boolean, ton?: boolean, subscriptionId?: string, peer?: EntityLike, offset?: string, limit?: number } = {}) {
        super();
        this.flags = args.flags;
        this.inbound = args.inbound;
        this.outbound = args.outbound;
        this.ascending = args.ascending;
        this.ton = args.ton;
        this.subscriptionId = args.subscriptionId;
        this.peer = args.peer;
        this.offset = args.offset!;
        this.limit = args.limit!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1775912279, false);
        let flags = 0;
        if (this.inbound) { flags |= 1 << 0; }
        if (this.outbound) { flags |= 1 << 1; }
        if (this.ascending) { flags |= 1 << 2; }
        if (this.ton) { flags |= 1 << 4; }
        if (this.subscriptionId !== undefined && this.subscriptionId !== null) { flags |= 1 << 3; }
        writer.writeInt(flags, false);
        if (this.inbound !== undefined && this.inbound !== null) {
        }
        if (this.outbound !== undefined && this.outbound !== null) {
        }
        if (this.ascending !== undefined && this.ascending !== null) {
        }
        if (this.ton !== undefined && this.ton !== null) {
        }
        if (this.subscriptionId !== undefined && this.subscriptionId !== null) {
            writer.tgWriteString(this.subscriptionId);
        }
        writer.write((this.peer! as any).getBytes());
        writer.tgWriteString(this.offset);
        writer.writeInt(this.limit);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeStarsStatus {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetStarsTransactions {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _inbound = true;
            args.inbound = _inbound;
        } else {
            args.inbound = false;
        }
        if (args.flags & (1 << 1)) {
            const _outbound = true;
            args.outbound = _outbound;
        } else {
            args.outbound = false;
        }
        if (args.flags & (1 << 2)) {
            const _ascending = true;
            args.ascending = _ascending;
        } else {
            args.ascending = false;
        }
        if (args.flags & (1 << 4)) {
            const _ton = true;
            args.ton = _ton;
        } else {
            args.ton = false;
        }
        if (args.flags & (1 << 3)) {
            const _subscriptionId = reader.tgReadString();
            args.subscriptionId = _subscriptionId;
        } else {
            args.subscriptionId = undefined;
        }
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        const _offset = reader.tgReadString();
        args.offset = _offset;
        const _limit = reader.readInt();
        args.limit = _limit;
        return new GetStarsTransactions(args);
    }
}