import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { TypeConnectedStarRefBots } from "../../types/payments/TypeConnectedStarRefBots";

export class GetConnectedStarRefBots extends MTProtoRequest {
    static CONSTRUCTOR_ID = 1483318611;
    static SUBCLASS_OF_ID = 593369703;
    static className = "payments.GetConnectedStarRefBots";
    static classType = "request";

    flags?: number;
    peer?: EntityLike;
    offsetDate?: number;
    offsetLink?: string;
    limit!: number;

    constructor(args: { flags?: number, peer?: EntityLike, offsetDate?: number, offsetLink?: string, limit?: number } = {}) {
        super();
        this.flags = args.flags;
        this.peer = args.peer;
        this.offsetDate = args.offsetDate;
        this.offsetLink = args.offsetLink;
        this.limit = args.limit!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1483318611, false);
        let flags = 0;
        if (this.offsetDate !== undefined && this.offsetDate !== null) { flags |= 1 << 2; }
        if (this.offsetLink !== undefined && this.offsetLink !== null) { flags |= 1 << 2; }
        writer.writeInt(flags, false);
        writer.write((this.peer! as any).getBytes());
        if (this.offsetDate !== undefined && this.offsetDate !== null) {
            writer.writeInt(this.offsetDate);
        }
        if (this.offsetLink !== undefined && this.offsetLink !== null) {
            writer.tgWriteString(this.offsetLink);
        }
        writer.writeInt(this.limit);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeConnectedStarRefBots {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetConnectedStarRefBots {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        if (args.flags & (1 << 2)) {
            const _offsetDate = reader.readInt();
            args.offsetDate = _offsetDate;
        } else {
            args.offsetDate = undefined;
        }
        if (args.flags & (1 << 2)) {
            const _offsetLink = reader.tgReadString();
            args.offsetLink = _offsetLink;
        } else {
            args.offsetLink = undefined;
        }
        const _limit = reader.readInt();
        args.limit = _limit;
        return new GetConnectedStarRefBots(args);
    }
}