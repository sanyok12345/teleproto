import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";

export class SentCodeTypeSms extends TLObject {
    static CONSTRUCTOR_ID = 3221273506;
    static SUBCLASS_OF_ID = 4284159374;
    static className = "auth.SentCodeTypeSms";
    static classType = "constructor";

    length!: number;

    constructor(args: { length?: number } = {}) {
        super();
        this.length = args.length!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3221273506, false);
        writer.writeInt(this.length);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): SentCodeTypeSms {
        const args: any = {};
        const _length = reader.readInt();
        args.length = _length;
        return new SentCodeTypeSms(args);
    }
}