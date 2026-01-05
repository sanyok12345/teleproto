import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class TlsBlockZero extends TLObject {
    static CONSTRUCTOR_ID = 3400654219;
    static SUBCLASS_OF_ID = 4044764304;
    static className = "TlsBlockZero";
    static classType = "constructor";

    length!: number;

    constructor(args: { length?: number } = {}) {
        super();
        this.length = args.length!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3400654219, false);
        writer.writeInt(this.length);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): TlsBlockZero {
        const args: any = {};
        const _length = reader.readInt();
        args.length = _length;
        return new TlsBlockZero(args);
    }
}