import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class LabeledPrice extends TLObject {
    static CONSTRUCTOR_ID = 3408489464;
    static SUBCLASS_OF_ID = 478413946;
    static className = "LabeledPrice";
    static classType = "constructor";

    label!: string;
    amount!: bigint;

    constructor(args: { label?: string, amount?: bigint } = {}) {
        super();
        this.label = args.label!;
        this.amount = args.amount!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3408489464, false);
        writer.tgWriteString(this.label);
        writer.writeLargeInt(this.amount, 64);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): LabeledPrice {
        const args: any = {};
        const _label = reader.tgReadString();
        args.label = _label;
        const _amount = reader.readLargeInt(64);
        args.amount = _amount;
        return new LabeledPrice(args);
    }
}