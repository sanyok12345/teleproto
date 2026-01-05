import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";

export class SentCodeTypeMissedCall extends TLObject {
    static CONSTRUCTOR_ID = 2181063812;
    static SUBCLASS_OF_ID = 4284159374;
    static className = "auth.SentCodeTypeMissedCall";
    static classType = "constructor";

    prefix!: string;
    length!: number;

    constructor(args: { prefix?: string, length?: number } = {}) {
        super();
        this.prefix = args.prefix!;
        this.length = args.length!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2181063812, false);
        writer.tgWriteString(this.prefix);
        writer.writeInt(this.length);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): SentCodeTypeMissedCall {
        const args: any = {};
        const _prefix = reader.tgReadString();
        args.prefix = _prefix;
        const _length = reader.readInt();
        args.length = _length;
        return new SentCodeTypeMissedCall(args);
    }
}