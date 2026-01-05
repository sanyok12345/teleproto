import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class MessageActionWebViewDataSent extends TLObject {
    static CONSTRUCTOR_ID = 3032714421;
    static SUBCLASS_OF_ID = 2256589094;
    static className = "MessageActionWebViewDataSent";
    static classType = "constructor";

    text!: string;

    constructor(args: { text?: string } = {}) {
        super();
        this.text = args.text!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3032714421, false);
        writer.tgWriteString(this.text);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): MessageActionWebViewDataSent {
        const args: any = {};
        const _text = reader.tgReadString();
        args.text = _text;
        return new MessageActionWebViewDataSent(args);
    }
}