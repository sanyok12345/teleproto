import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class AttachMenuBotIconColor extends TLObject {
    static CONSTRUCTOR_ID = 1165423600;
    static SUBCLASS_OF_ID = 3198471018;
    static className = "AttachMenuBotIconColor";
    static classType = "constructor";

    name!: string;
    color!: number;

    constructor(args: { name?: string, color?: number } = {}) {
        super();
        this.name = args.name!;
        this.color = args.color!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1165423600, false);
        writer.tgWriteString(this.name);
        writer.writeInt(this.color);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): AttachMenuBotIconColor {
        const args: any = {};
        const _name = reader.tgReadString();
        args.name = _name;
        const _color = reader.readInt();
        args.color = _color;
        return new AttachMenuBotIconColor(args);
    }
}