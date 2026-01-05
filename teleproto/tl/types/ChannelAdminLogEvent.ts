import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeChannelAdminLogEventAction } from "./TypeChannelAdminLogEventAction";

export class ChannelAdminLogEvent extends TLObject {
    static CONSTRUCTOR_ID = 531458253;
    static SUBCLASS_OF_ID = 1083115929;
    static className = "ChannelAdminLogEvent";
    static classType = "constructor";

    id!: bigint;
    date!: number;
    userId!: bigint;
    action!: TypeChannelAdminLogEventAction;

    constructor(args: { id?: bigint, date?: number, userId?: bigint, action?: TypeChannelAdminLogEventAction } = {}) {
        super();
        this.id = args.id!;
        this.date = args.date!;
        this.userId = args.userId!;
        this.action = args.action!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(531458253, false);
        writer.writeLargeInt(this.id, 64);
        writer.writeInt(this.date);
        writer.writeLargeInt(this.userId, 64);
        writer.write(this.action.getBytes());
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): ChannelAdminLogEvent {
        const args: any = {};
        const _id = reader.readLargeInt(64);
        args.id = _id;
        const _date = reader.readInt();
        args.date = _date;
        const _userId = reader.readLargeInt(64);
        args.userId = _userId;
        const _action = reader.tgReadObject();
        args.action = _action;
        return new ChannelAdminLogEvent(args);
    }
}