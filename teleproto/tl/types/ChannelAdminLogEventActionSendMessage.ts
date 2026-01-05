import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeMessage } from "./TypeMessage";

export class ChannelAdminLogEventActionSendMessage extends TLObject {
    static CONSTRUCTOR_ID = 663693416;
    static SUBCLASS_OF_ID = 2998503411;
    static className = "ChannelAdminLogEventActionSendMessage";
    static classType = "constructor";

    message!: TypeMessage;

    constructor(args: { message?: TypeMessage } = {}) {
        super();
        this.message = args.message!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(663693416, false);
        writer.write(this.message.getBytes());
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): ChannelAdminLogEventActionSendMessage {
        const args: any = {};
        const _message = reader.tgReadObject();
        args.message = _message;
        return new ChannelAdminLogEventActionSendMessage(args);
    }
}