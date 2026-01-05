import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class KeyboardButtonUrl extends TLObject {
    static CONSTRUCTOR_ID = 629866245;
    static SUBCLASS_OF_ID = 195916963;
    static className = "KeyboardButtonUrl";
    static classType = "constructor";

    text!: string;
    url!: string;

    constructor(args: { text?: string, url?: string } = {}) {
        super();
        this.text = args.text!;
        this.url = args.url!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(629866245, false);
        writer.tgWriteString(this.text);
        writer.tgWriteString(this.url);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): KeyboardButtonUrl {
        const args: any = {};
        const _text = reader.tgReadString();
        args.text = _text;
        const _url = reader.tgReadString();
        args.url = _url;
        return new KeyboardButtonUrl(args);
    }
}