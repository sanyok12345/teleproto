import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypePhoneCall } from "./TypePhoneCall";

export class UpdatePhoneCall extends TLObject {
    static CONSTRUCTOR_ID = 2869914398;
    static SUBCLASS_OF_ID = 2676568142;
    static className = "UpdatePhoneCall";
    static classType = "constructor";

    phoneCall!: TypePhoneCall;

    constructor(args: { phoneCall?: TypePhoneCall } = {}) {
        super();
        this.phoneCall = args.phoneCall!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2869914398, false);
        writer.write(this.phoneCall.getBytes());
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): UpdatePhoneCall {
        const args: any = {};
        const _phoneCall = reader.tgReadObject();
        args.phoneCall = _phoneCall;
        return new UpdatePhoneCall(args);
    }
}