import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeRichText } from "./TypeRichText";

export class PageBlockPreformatted extends TLObject {
    static CONSTRUCTOR_ID = 3228621118;
    static SUBCLASS_OF_ID = 449467972;
    static className = "PageBlockPreformatted";
    static classType = "constructor";

    text!: TypeRichText;
    language!: string;

    constructor(args: { text?: TypeRichText, language?: string } = {}) {
        super();
        this.text = args.text!;
        this.language = args.language!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3228621118, false);
        writer.write(this.text.getBytes());
        writer.tgWriteString(this.language);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): PageBlockPreformatted {
        const args: any = {};
        const _text = reader.tgReadObject();
        args.text = _text;
        const _language = reader.tgReadString();
        args.language = _language;
        return new PageBlockPreformatted(args);
    }
}