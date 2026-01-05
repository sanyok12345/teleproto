import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class BotMenuButton extends TLObject {
    static CONSTRUCTOR_ID = 3350559974;
    static SUBCLASS_OF_ID = 1282522428;
    static className = "BotMenuButton";
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
        writer.writeInt(3350559974, false);
        writer.tgWriteString(this.text);
        writer.tgWriteString(this.url);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): BotMenuButton {
        const args: any = {};
        const _text = reader.tgReadString();
        args.text = _text;
        const _url = reader.tgReadString();
        args.url = _url;
        return new BotMenuButton(args);
    }
}