import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class MessageActionCustomAction extends TLObject {
    static CONSTRUCTOR_ID = 4209418070;
    static SUBCLASS_OF_ID = 2256589094;
    static className = "MessageActionCustomAction";
    static classType = "constructor";

    message!: string;

    constructor(args: { message?: string } = {}) {
        super();
        this.message = args.message!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(4209418070, false);
        writer.tgWriteString(this.message);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): MessageActionCustomAction {
        const args: any = {};
        const _message = reader.tgReadString();
        args.message = _message;
        return new MessageActionCustomAction(args);
    }
}