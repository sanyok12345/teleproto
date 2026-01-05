import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class ExportedMessageLink extends TLObject {
    static CONSTRUCTOR_ID = 1571494644;
    static SUBCLASS_OF_ID = 3739632844;
    static className = "ExportedMessageLink";
    static classType = "constructor";

    link!: string;
    html!: string;

    constructor(args: { link?: string, html?: string } = {}) {
        super();
        this.link = args.link!;
        this.html = args.html!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1571494644, false);
        writer.tgWriteString(this.link);
        writer.tgWriteString(this.html);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): ExportedMessageLink {
        const args: any = {};
        const _link = reader.tgReadString();
        args.link = _link;
        const _html = reader.tgReadString();
        args.html = _html;
        return new ExportedMessageLink(args);
    }
}