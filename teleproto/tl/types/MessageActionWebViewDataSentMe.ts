import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class MessageActionWebViewDataSentMe extends TLObject {
    static CONSTRUCTOR_ID = 1205698681;
    static SUBCLASS_OF_ID = 2256589094;
    static className = "MessageActionWebViewDataSentMe";
    static classType = "constructor";

    text!: string;
    data!: string;

    constructor(args: { text?: string, data?: string } = {}) {
        super();
        this.text = args.text!;
        this.data = args.data!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1205698681, false);
        writer.tgWriteString(this.text);
        writer.tgWriteString(this.data);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): MessageActionWebViewDataSentMe {
        const args: any = {};
        const _text = reader.tgReadString();
        args.text = _text;
        const _data = reader.tgReadString();
        args.data = _data;
        return new MessageActionWebViewDataSentMe(args);
    }
}