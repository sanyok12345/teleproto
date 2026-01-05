import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class StarsAmount extends TLObject {
    static CONSTRUCTOR_ID = 3149313187;
    static SUBCLASS_OF_ID = 895169088;
    static className = "StarsAmount";
    static classType = "constructor";

    amount!: bigint;
    nanos!: number;

    constructor(args: { amount?: bigint, nanos?: number } = {}) {
        super();
        this.amount = args.amount!;
        this.nanos = args.nanos!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3149313187, false);
        writer.writeLargeInt(this.amount, 64);
        writer.writeInt(this.nanos);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): StarsAmount {
        const args: any = {};
        const _amount = reader.readLargeInt(64);
        args.amount = _amount;
        const _nanos = reader.readInt();
        args.nanos = _nanos;
        return new StarsAmount(args);
    }
}