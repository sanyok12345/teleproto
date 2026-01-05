import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class ChannelParticipant extends TLObject {
    static CONSTRUCTOR_ID = 3409540633;
    static SUBCLASS_OF_ID = 3653762072;
    static className = "ChannelParticipant";
    static classType = "constructor";

    flags!: number;
    userId!: bigint;
    date!: number;
    subscriptionUntilDate?: number;

    constructor(args: { flags?: number, userId?: bigint, date?: number, subscriptionUntilDate?: number } = {}) {
        super();
        this.flags = args.flags!;
        this.userId = args.userId!;
        this.date = args.date!;
        this.subscriptionUntilDate = args.subscriptionUntilDate;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3409540633, false);
        let flags = 0;
        if (this.subscriptionUntilDate !== undefined && this.subscriptionUntilDate !== null) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        writer.writeLargeInt(this.userId, 64);
        writer.writeInt(this.date);
        if (this.subscriptionUntilDate !== undefined && this.subscriptionUntilDate !== null) {
            writer.writeInt(this.subscriptionUntilDate);
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): ChannelParticipant {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        const _userId = reader.readLargeInt(64);
        args.userId = _userId;
        const _date = reader.readInt();
        args.date = _date;
        if (args.flags & (1 << 0)) {
            const _subscriptionUntilDate = reader.readInt();
            args.subscriptionUntilDate = _subscriptionUntilDate;
        } else {
            args.subscriptionUntilDate = undefined;
        }
        return new ChannelParticipant(args);
    }
}