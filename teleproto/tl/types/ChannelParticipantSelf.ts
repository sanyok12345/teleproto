import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class ChannelParticipantSelf extends TLObject {
    static CONSTRUCTOR_ID = 1331723247;
    static SUBCLASS_OF_ID = 3653762072;
    static className = "ChannelParticipantSelf";
    static classType = "constructor";

    flags!: number;
    viaRequest?: boolean;
    userId!: bigint;
    inviterId!: bigint;
    date!: number;
    subscriptionUntilDate?: number;

    constructor(args: { flags?: number, viaRequest?: boolean, userId?: bigint, inviterId?: bigint, date?: number, subscriptionUntilDate?: number } = {}) {
        super();
        this.flags = args.flags!;
        this.viaRequest = args.viaRequest;
        this.userId = args.userId!;
        this.inviterId = args.inviterId!;
        this.date = args.date!;
        this.subscriptionUntilDate = args.subscriptionUntilDate;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1331723247, false);
        let flags = 0;
        if (this.viaRequest) { flags |= 1 << 0; }
        if (this.subscriptionUntilDate !== undefined && this.subscriptionUntilDate !== null) { flags |= 1 << 1; }
        writer.writeInt(flags, false);
        if (this.viaRequest !== undefined && this.viaRequest !== null) {
        }
        writer.writeLargeInt(this.userId, 64);
        writer.writeLargeInt(this.inviterId, 64);
        writer.writeInt(this.date);
        if (this.subscriptionUntilDate !== undefined && this.subscriptionUntilDate !== null) {
            writer.writeInt(this.subscriptionUntilDate);
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): ChannelParticipantSelf {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _viaRequest = true;
            args.viaRequest = _viaRequest;
        } else {
            args.viaRequest = false;
        }
        const _userId = reader.readLargeInt(64);
        args.userId = _userId;
        const _inviterId = reader.readLargeInt(64);
        args.inviterId = _inviterId;
        const _date = reader.readInt();
        args.date = _date;
        if (args.flags & (1 << 1)) {
            const _subscriptionUntilDate = reader.readInt();
            args.subscriptionUntilDate = _subscriptionUntilDate;
        } else {
            args.subscriptionUntilDate = undefined;
        }
        return new ChannelParticipantSelf(args);
    }
}