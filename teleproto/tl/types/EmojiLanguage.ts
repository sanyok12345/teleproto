import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class EmojiLanguage extends TLObject {
    static CONSTRUCTOR_ID = 3019592545;
    static SUBCLASS_OF_ID = 2760705262;
    static className = "EmojiLanguage";
    static classType = "constructor";

    langCode!: string;

    constructor(args: { langCode?: string } = {}) {
        super();
        this.langCode = args.langCode!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3019592545, false);
        writer.tgWriteString(this.langCode);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): EmojiLanguage {
        const args: any = {};
        const _langCode = reader.tgReadString();
        args.langCode = _langCode;
        return new EmojiLanguage(args);
    }
}