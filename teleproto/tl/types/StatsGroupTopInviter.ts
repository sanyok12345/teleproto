import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class StatsGroupTopInviter extends TLObject {
    static CONSTRUCTOR_ID = 1398765469;
    static SUBCLASS_OF_ID = 2231438458;
    static className = "StatsGroupTopInviter";
    static classType = "constructor";

    userId!: bigint;
    invitations!: number;

    constructor(args: { userId?: bigint, invitations?: number } = {}) {
        super();
        this.userId = args.userId!;
        this.invitations = args.invitations!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1398765469, false);
        writer.writeLargeInt(this.userId, 64);
        writer.writeInt(this.invitations);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): StatsGroupTopInviter {
        const args: any = {};
        const _userId = reader.readLargeInt(64);
        args.userId = _userId;
        const _invitations = reader.readInt();
        args.invitations = _invitations;
        return new StatsGroupTopInviter(args);
    }
}