import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeInputGroupCall } from "./TypeInputGroupCall";
import { TypeGroupCallMessage } from "./TypeGroupCallMessage";

export class UpdateGroupCallMessage extends TLObject {
    static CONSTRUCTOR_ID = 3627183885;
    static SUBCLASS_OF_ID = 2676568142;
    static className = "UpdateGroupCallMessage";
    static classType = "constructor";

    call!: TypeInputGroupCall;
    message!: TypeGroupCallMessage;

    constructor(args: { call?: TypeInputGroupCall, message?: TypeGroupCallMessage } = {}) {
        super();
        this.call = args.call!;
        this.message = args.message!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3627183885, false);
        writer.write(this.call.getBytes());
        writer.write(this.message.getBytes());
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): UpdateGroupCallMessage {
        const args: any = {};
        const _call = reader.tgReadObject();
        args.call = _call;
        const _message = reader.tgReadObject();
        args.message = _message;
        return new UpdateGroupCallMessage(args);
    }
}