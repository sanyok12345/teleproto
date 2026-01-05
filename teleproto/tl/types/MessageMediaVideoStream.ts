import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeInputGroupCall } from "./TypeInputGroupCall";

export class MessageMediaVideoStream extends TLObject {
    static CONSTRUCTOR_ID = 3395070857;
    static SUBCLASS_OF_ID = 1198308914;
    static className = "MessageMediaVideoStream";
    static classType = "constructor";

    flags!: number;
    rtmpStream?: boolean;
    call!: TypeInputGroupCall;

    constructor(args: { flags?: number, rtmpStream?: boolean, call?: TypeInputGroupCall } = {}) {
        super();
        this.flags = args.flags!;
        this.rtmpStream = args.rtmpStream;
        this.call = args.call!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3395070857, false);
        let flags = 0;
        if (this.rtmpStream) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        if (this.rtmpStream !== undefined && this.rtmpStream !== null) {
        }
        writer.write(this.call.getBytes());
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): MessageMediaVideoStream {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _rtmpStream = true;
            args.rtmpStream = _rtmpStream;
        } else {
            args.rtmpStream = false;
        }
        const _call = reader.tgReadObject();
        args.call = _call;
        return new MessageMediaVideoStream(args);
    }
}