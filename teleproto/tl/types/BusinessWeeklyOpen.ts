import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class BusinessWeeklyOpen extends TLObject {
    static CONSTRUCTOR_ID = 302717625;
    static SUBCLASS_OF_ID = 406857255;
    static className = "BusinessWeeklyOpen";
    static classType = "constructor";

    startMinute!: number;
    endMinute!: number;

    constructor(args: { startMinute?: number, endMinute?: number } = {}) {
        super();
        this.startMinute = args.startMinute!;
        this.endMinute = args.endMinute!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(302717625, false);
        writer.writeInt(this.startMinute);
        writer.writeInt(this.endMinute);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): BusinessWeeklyOpen {
        const args: any = {};
        const _startMinute = reader.readInt();
        args.startMinute = _startMinute;
        const _endMinute = reader.readInt();
        args.endMinute = _endMinute;
        return new BusinessWeeklyOpen(args);
    }
}