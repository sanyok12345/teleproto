import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class ChatParticipantAdmin extends TLObject {
    static CONSTRUCTOR_ID = 2694004571;
    static SUBCLASS_OF_ID = 2105307014;
    static className = "ChatParticipantAdmin";
    static classType = "constructor";

    userId!: bigint;
    inviterId!: bigint;
    date!: number;

    constructor(args: { userId?: bigint, inviterId?: bigint, date?: number } = {}) {
        super();
        this.userId = args.userId!;
        this.inviterId = args.inviterId!;
        this.date = args.date!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2694004571, false);
        writer.writeLargeInt(this.userId, 64);
        writer.writeLargeInt(this.inviterId, 64);
        writer.writeInt(this.date);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): ChatParticipantAdmin {
        const args: any = {};
        const _userId = reader.readLargeInt(64);
        args.userId = _userId;
        const _inviterId = reader.readLargeInt(64);
        args.inviterId = _inviterId;
        const _date = reader.readInt();
        args.date = _date;
        return new ChatParticipantAdmin(args);
    }
}