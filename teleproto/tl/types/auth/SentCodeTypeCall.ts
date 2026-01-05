import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";

export class SentCodeTypeCall extends TLObject {
    static CONSTRUCTOR_ID = 1398007207;
    static SUBCLASS_OF_ID = 4284159374;
    static className = "auth.SentCodeTypeCall";
    static classType = "constructor";

    length!: number;

    constructor(args: { length?: number } = {}) {
        super();
        this.length = args.length!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1398007207, false);
        writer.writeInt(this.length);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): SentCodeTypeCall {
        const args: any = {};
        const _length = reader.readInt();
        args.length = _length;
        return new SentCodeTypeCall(args);
    }
}