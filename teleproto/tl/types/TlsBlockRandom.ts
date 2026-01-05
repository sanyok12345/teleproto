import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class TlsBlockRandom extends TLObject {
    static CONSTRUCTOR_ID = 3265966728;
    static SUBCLASS_OF_ID = 4044764304;
    static className = "TlsBlockRandom";
    static classType = "constructor";

    length!: number;

    constructor(args: { length?: number } = {}) {
        super();
        this.length = args.length!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3265966728, false);
        writer.writeInt(this.length);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): TlsBlockRandom {
        const args: any = {};
        const _length = reader.readInt();
        args.length = _length;
        return new TlsBlockRandom(args);
    }
}