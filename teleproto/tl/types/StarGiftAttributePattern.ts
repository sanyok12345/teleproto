import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeDocument } from "./TypeDocument";

export class StarGiftAttributePattern extends TLObject {
    static CONSTRUCTOR_ID = 330104601;
    static SUBCLASS_OF_ID = 2276819400;
    static className = "StarGiftAttributePattern";
    static classType = "constructor";

    name!: string;
    document!: TypeDocument;
    rarityPermille!: number;

    constructor(args: { name?: string, document?: TypeDocument, rarityPermille?: number } = {}) {
        super();
        this.name = args.name!;
        this.document = args.document!;
        this.rarityPermille = args.rarityPermille!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(330104601, false);
        writer.tgWriteString(this.name);
        writer.write(this.document.getBytes());
        writer.writeInt(this.rarityPermille);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): StarGiftAttributePattern {
        const args: any = {};
        const _name = reader.tgReadString();
        args.name = _name;
        const _document = reader.tgReadObject();
        args.document = _document;
        const _rarityPermille = reader.readInt();
        args.rarityPermille = _rarityPermille;
        return new StarGiftAttributePattern(args);
    }
}