import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";

export class DifferenceTooLong extends TLObject {
    static CONSTRUCTOR_ID = 1258196845;
    static SUBCLASS_OF_ID = 541599860;
    static className = "updates.DifferenceTooLong";
    static classType = "constructor";

    pts!: number;

    constructor(args: { pts?: number } = {}) {
        super();
        this.pts = args.pts!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1258196845, false);
        writer.writeInt(this.pts);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): DifferenceTooLong {
        const args: any = {};
        const _pts = reader.readInt();
        args.pts = _pts;
        return new DifferenceTooLong(args);
    }
}