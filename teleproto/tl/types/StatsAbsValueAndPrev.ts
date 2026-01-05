import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class StatsAbsValueAndPrev extends TLObject {
    static CONSTRUCTOR_ID = 3410210014;
    static SUBCLASS_OF_ID = 1052662191;
    static className = "StatsAbsValueAndPrev";
    static classType = "constructor";

    current!: number;
    previous!: number;

    constructor(args: { current?: number, previous?: number } = {}) {
        super();
        this.current = args.current!;
        this.previous = args.previous!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3410210014, false);
        writer.writeDouble(this.current);
        writer.writeDouble(this.previous);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): StatsAbsValueAndPrev {
        const args: any = {};
        const _current = reader.readDouble();
        args.current = _current;
        const _previous = reader.readDouble();
        args.previous = _previous;
        return new StatsAbsValueAndPrev(args);
    }
}