import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class StarsTonAmount extends TLObject {
    static CONSTRUCTOR_ID = 1957618656;
    static SUBCLASS_OF_ID = 895169088;
    static className = "StarsTonAmount";
    static classType = "constructor";

    amount!: bigint;

    constructor(args: { amount?: bigint } = {}) {
        super();
        this.amount = args.amount!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1957618656, false);
        writer.writeLargeInt(this.amount, 64);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): StarsTonAmount {
        const args: any = {};
        const _amount = reader.readLargeInt(64);
        args.amount = _amount;
        return new StarsTonAmount(args);
    }
}