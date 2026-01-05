import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class StarGiftAttributeBackdrop extends TLObject {
    static CONSTRUCTOR_ID = 3644687772;
    static SUBCLASS_OF_ID = 2276819400;
    static className = "StarGiftAttributeBackdrop";
    static classType = "constructor";

    name!: string;
    backdropId!: number;
    centerColor!: number;
    edgeColor!: number;
    patternColor!: number;
    textColor!: number;
    rarityPermille!: number;

    constructor(args: { name?: string, backdropId?: number, centerColor?: number, edgeColor?: number, patternColor?: number, textColor?: number, rarityPermille?: number } = {}) {
        super();
        this.name = args.name!;
        this.backdropId = args.backdropId!;
        this.centerColor = args.centerColor!;
        this.edgeColor = args.edgeColor!;
        this.patternColor = args.patternColor!;
        this.textColor = args.textColor!;
        this.rarityPermille = args.rarityPermille!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3644687772, false);
        writer.tgWriteString(this.name);
        writer.writeInt(this.backdropId);
        writer.writeInt(this.centerColor);
        writer.writeInt(this.edgeColor);
        writer.writeInt(this.patternColor);
        writer.writeInt(this.textColor);
        writer.writeInt(this.rarityPermille);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): StarGiftAttributeBackdrop {
        const args: any = {};
        const _name = reader.tgReadString();
        args.name = _name;
        const _backdropId = reader.readInt();
        args.backdropId = _backdropId;
        const _centerColor = reader.readInt();
        args.centerColor = _centerColor;
        const _edgeColor = reader.readInt();
        args.edgeColor = _edgeColor;
        const _patternColor = reader.readInt();
        args.patternColor = _patternColor;
        const _textColor = reader.readInt();
        args.textColor = _textColor;
        const _rarityPermille = reader.readInt();
        args.rarityPermille = _rarityPermille;
        return new StarGiftAttributeBackdrop(args);
    }
}