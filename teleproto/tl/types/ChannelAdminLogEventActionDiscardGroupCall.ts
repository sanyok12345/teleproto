import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeInputGroupCall } from "./TypeInputGroupCall";

export class ChannelAdminLogEventActionDiscardGroupCall extends TLObject {
    static CONSTRUCTOR_ID = 3684667712;
    static SUBCLASS_OF_ID = 2998503411;
    static className = "ChannelAdminLogEventActionDiscardGroupCall";
    static classType = "constructor";

    call!: TypeInputGroupCall;

    constructor(args: { call?: TypeInputGroupCall } = {}) {
        super();
        this.call = args.call!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3684667712, false);
        writer.write(this.call.getBytes());
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): ChannelAdminLogEventActionDiscardGroupCall {
        const args: any = {};
        const _call = reader.tgReadObject();
        args.call = _call;
        return new ChannelAdminLogEventActionDiscardGroupCall(args);
    }
}