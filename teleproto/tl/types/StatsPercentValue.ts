import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class StatsPercentValue extends TLObject {
    static CONSTRUCTOR_ID = 3419287520;
    static SUBCLASS_OF_ID = 2533541150;
    static className = "StatsPercentValue";
    static classType = "constructor";

    part!: number;
    total!: number;

    constructor(args: { part?: number, total?: number } = {}) {
        super();
        this.part = args.part!;
        this.total = args.total!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3419287520, false);
        writer.writeDouble(this.part);
        writer.writeDouble(this.total);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): StatsPercentValue {
        const args: any = {};
        const _part = reader.readDouble();
        args.part = _part;
        const _total = reader.readDouble();
        args.total = _total;
        return new StatsPercentValue(args);
    }
}