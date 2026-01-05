import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeInputGroupCall } from "./TypeInputGroupCall";

export class ChannelAdminLogEventActionStartGroupCall extends TLObject {
    static CONSTRUCTOR_ID = 589338437;
    static SUBCLASS_OF_ID = 2998503411;
    static className = "ChannelAdminLogEventActionStartGroupCall";
    static classType = "constructor";

    call!: TypeInputGroupCall;

    constructor(args: { call?: TypeInputGroupCall } = {}) {
        super();
        this.call = args.call!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(589338437, false);
        writer.write(this.call.getBytes());
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): ChannelAdminLogEventActionStartGroupCall {
        const args: any = {};
        const _call = reader.tgReadObject();
        args.call = _call;
        return new ChannelAdminLogEventActionStartGroupCall(args);
    }
}