import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class TlsBlockGrease extends TLObject {
    static CONSTRUCTOR_ID = 2623335513;
    static SUBCLASS_OF_ID = 4044764304;
    static className = "TlsBlockGrease";
    static classType = "constructor";

    seed!: number;

    constructor(args: { seed?: number } = {}) {
        super();
        this.seed = args.seed!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2623335513, false);
        writer.writeInt(this.seed);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): TlsBlockGrease {
        const args: any = {};
        const _seed = reader.readInt();
        args.seed = _seed;
        return new TlsBlockGrease(args);
    }
}