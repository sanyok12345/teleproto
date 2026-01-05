import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeMessage } from "./TypeMessage";

export class PublicForwardMessage extends TLObject {
    static CONSTRUCTOR_ID = 32685898;
    static SUBCLASS_OF_ID = 1653609939;
    static className = "PublicForwardMessage";
    static classType = "constructor";

    message!: TypeMessage;

    constructor(args: { message?: TypeMessage } = {}) {
        super();
        this.message = args.message!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(32685898, false);
        writer.write(this.message.getBytes());
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): PublicForwardMessage {
        const args: any = {};
        const _message = reader.tgReadObject();
        args.message = _message;
        return new PublicForwardMessage(args);
    }
}