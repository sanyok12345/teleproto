import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeInputGroupCall } from "./TypeInputGroupCall";

export class MessageActionGroupCall extends TLObject {
    static CONSTRUCTOR_ID = 2047704898;
    static SUBCLASS_OF_ID = 2256589094;
    static className = "MessageActionGroupCall";
    static classType = "constructor";

    flags!: number;
    call!: TypeInputGroupCall;
    duration?: number;

    constructor(args: { flags?: number, call?: TypeInputGroupCall, duration?: number } = {}) {
        super();
        this.flags = args.flags!;
        this.call = args.call!;
        this.duration = args.duration;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2047704898, false);
        let flags = 0;
        if (this.duration !== undefined && this.duration !== null) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        writer.write(this.call.getBytes());
        if (this.duration !== undefined && this.duration !== null) {
            writer.writeInt(this.duration);
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): MessageActionGroupCall {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        const _call = reader.tgReadObject();
        args.call = _call;
        if (args.flags & (1 << 0)) {
            const _duration = reader.readInt();
            args.duration = _duration;
        } else {
            args.duration = undefined;
        }
        return new MessageActionGroupCall(args);
    }
}