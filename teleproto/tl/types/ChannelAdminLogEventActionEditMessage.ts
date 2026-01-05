import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeMessage } from "./TypeMessage";

export class ChannelAdminLogEventActionEditMessage extends TLObject {
    static CONSTRUCTOR_ID = 1889215493;
    static SUBCLASS_OF_ID = 2998503411;
    static className = "ChannelAdminLogEventActionEditMessage";
    static classType = "constructor";

    prevMessage!: TypeMessage;
    newMessage!: TypeMessage;

    constructor(args: { prevMessage?: TypeMessage, newMessage?: TypeMessage } = {}) {
        super();
        this.prevMessage = args.prevMessage!;
        this.newMessage = args.newMessage!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1889215493, false);
        writer.write(this.prevMessage.getBytes());
        writer.write(this.newMessage.getBytes());
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): ChannelAdminLogEventActionEditMessage {
        const args: any = {};
        const _prevMessage = reader.tgReadObject();
        args.prevMessage = _prevMessage;
        const _newMessage = reader.tgReadObject();
        args.newMessage = _newMessage;
        return new ChannelAdminLogEventActionEditMessage(args);
    }
}