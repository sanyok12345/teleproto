import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeRichText } from "./TypeRichText";

export class TextUrl extends TLObject {
    static CONSTRUCTOR_ID = 1009288385;
    static SUBCLASS_OF_ID = 4056986745;
    static className = "TextUrl";
    static classType = "constructor";

    text!: TypeRichText;
    url!: string;
    webpageId!: bigint;

    constructor(args: { text?: TypeRichText, url?: string, webpageId?: bigint } = {}) {
        super();
        this.text = args.text!;
        this.url = args.url!;
        this.webpageId = args.webpageId!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1009288385, false);
        writer.write(this.text.getBytes());
        writer.tgWriteString(this.url);
        writer.writeLargeInt(this.webpageId, 64);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): TextUrl {
        const args: any = {};
        const _text = reader.tgReadObject();
        args.text = _text;
        const _url = reader.tgReadString();
        args.url = _url;
        const _webpageId = reader.readLargeInt(64);
        args.webpageId = _webpageId;
        return new TextUrl(args);
    }
}