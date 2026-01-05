import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeMessage } from "./TypeMessage";

export class ChannelAdminLogEventActionDeleteMessage extends TLObject {
    static CONSTRUCTOR_ID = 1121994683;
    static SUBCLASS_OF_ID = 2998503411;
    static className = "ChannelAdminLogEventActionDeleteMessage";
    static classType = "constructor";

    message!: TypeMessage;

    constructor(args: { message?: TypeMessage } = {}) {
        super();
        this.message = args.message!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1121994683, false);
        writer.write(this.message.getBytes());
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): ChannelAdminLogEventActionDeleteMessage {
        const args: any = {};
        const _message = reader.tgReadObject();
        args.message = _message;
        return new ChannelAdminLogEventActionDeleteMessage(args);
    }
}