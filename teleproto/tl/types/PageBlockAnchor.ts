import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class PageBlockAnchor extends TLObject {
    static CONSTRUCTOR_ID = 3456972720;
    static SUBCLASS_OF_ID = 449467972;
    static className = "PageBlockAnchor";
    static classType = "constructor";

    name!: string;

    constructor(args: { name?: string } = {}) {
        super();
        this.name = args.name!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3456972720, false);
        writer.tgWriteString(this.name);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): PageBlockAnchor {
        const args: any = {};
        const _name = reader.tgReadString();
        args.name = _name;
        return new PageBlockAnchor(args);
    }
}