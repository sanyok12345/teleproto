import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class EmojiURL extends TLObject {
    static CONSTRUCTOR_ID = 2775937949;
    static SUBCLASS_OF_ID = 530614809;
    static className = "EmojiURL";
    static classType = "constructor";

    url!: string;

    constructor(args: { url?: string } = {}) {
        super();
        this.url = args.url!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2775937949, false);
        writer.tgWriteString(this.url);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): EmojiURL {
        const args: any = {};
        const _url = reader.tgReadString();
        args.url = _url;
        return new EmojiURL(args);
    }
}