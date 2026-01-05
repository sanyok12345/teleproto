import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { TypeStarsStatus } from "../../types/payments/TypeStarsStatus";

export class GetStarsSubscriptions extends MTProtoRequest {
    static CONSTRUCTOR_ID = 52761285;
    static SUBCLASS_OF_ID = 1855724911;
    static className = "payments.GetStarsSubscriptions";
    static classType = "request";

    flags?: number;
    missingBalance?: boolean;
    peer?: EntityLike;
    offset!: string;

    constructor(args: { flags?: number, missingBalance?: boolean, peer?: EntityLike, offset?: string } = {}) {
        super();
        this.flags = args.flags;
        this.missingBalance = args.missingBalance;
        this.peer = args.peer;
        this.offset = args.offset!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(52761285, false);
        let flags = 0;
        if (this.missingBalance) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        if (this.missingBalance !== undefined && this.missingBalance !== null) {
        }
        writer.write((this.peer! as any).getBytes());
        writer.tgWriteString(this.offset);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeStarsStatus {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetStarsSubscriptions {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _missingBalance = true;
            args.missingBalance = _missingBalance;
        } else {
            args.missingBalance = false;
        }
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        const _offset = reader.tgReadString();
        args.offset = _offset;
        return new GetStarsSubscriptions(args);
    }
}