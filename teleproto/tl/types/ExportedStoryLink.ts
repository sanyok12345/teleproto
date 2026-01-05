import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class ExportedStoryLink extends TLObject {
    static CONSTRUCTOR_ID = 1070138683;
    static SUBCLASS_OF_ID = 264585638;
    static className = "ExportedStoryLink";
    static classType = "constructor";

    link!: string;

    constructor(args: { link?: string } = {}) {
        super();
        this.link = args.link!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1070138683, false);
        writer.tgWriteString(this.link);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): ExportedStoryLink {
        const args: any = {};
        const _link = reader.tgReadString();
        args.link = _link;
        return new ExportedStoryLink(args);
    }
}