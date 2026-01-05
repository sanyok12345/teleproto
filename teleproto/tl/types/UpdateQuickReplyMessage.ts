import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeMessage } from "./TypeMessage";

export class UpdateQuickReplyMessage extends TLObject {
    static CONSTRUCTOR_ID = 1040518415;
    static SUBCLASS_OF_ID = 2676568142;
    static className = "UpdateQuickReplyMessage";
    static classType = "constructor";

    message!: TypeMessage;

    constructor(args: { message?: TypeMessage } = {}) {
        super();
        this.message = args.message!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1040518415, false);
        writer.write(this.message.getBytes());
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): UpdateQuickReplyMessage {
        const args: any = {};
        const _message = reader.tgReadObject();
        args.message = _message;
        return new UpdateQuickReplyMessage(args);
    }
}