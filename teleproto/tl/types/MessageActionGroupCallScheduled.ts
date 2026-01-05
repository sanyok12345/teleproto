import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeInputGroupCall } from "./TypeInputGroupCall";

export class MessageActionGroupCallScheduled extends TLObject {
    static CONSTRUCTOR_ID = 3013637729;
    static SUBCLASS_OF_ID = 2256589094;
    static className = "MessageActionGroupCallScheduled";
    static classType = "constructor";

    call!: TypeInputGroupCall;
    scheduleDate!: number;

    constructor(args: { call?: TypeInputGroupCall, scheduleDate?: number } = {}) {
        super();
        this.call = args.call!;
        this.scheduleDate = args.scheduleDate!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3013637729, false);
        writer.write(this.call.getBytes());
        writer.writeInt(this.scheduleDate);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): MessageActionGroupCallScheduled {
        const args: any = {};
        const _call = reader.tgReadObject();
        args.call = _call;
        const _scheduleDate = reader.readInt();
        args.scheduleDate = _scheduleDate;
        return new MessageActionGroupCallScheduled(args);
    }
}