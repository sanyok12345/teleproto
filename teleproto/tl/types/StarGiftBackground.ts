import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class StarGiftBackground extends TLObject {
    static CONSTRUCTOR_ID = 2952094616;
    static SUBCLASS_OF_ID = 63248936;
    static className = "StarGiftBackground";
    static classType = "constructor";

    centerColor!: number;
    edgeColor!: number;
    textColor!: number;

    constructor(args: { centerColor?: number, edgeColor?: number, textColor?: number } = {}) {
        super();
        this.centerColor = args.centerColor!;
        this.edgeColor = args.edgeColor!;
        this.textColor = args.textColor!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2952094616, false);
        writer.writeInt(this.centerColor);
        writer.writeInt(this.edgeColor);
        writer.writeInt(this.textColor);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): StarGiftBackground {
        const args: any = {};
        const _centerColor = reader.readInt();
        args.centerColor = _centerColor;
        const _edgeColor = reader.readInt();
        args.edgeColor = _edgeColor;
        const _textColor = reader.readInt();
        args.textColor = _textColor;
        return new StarGiftBackground(args);
    }
}