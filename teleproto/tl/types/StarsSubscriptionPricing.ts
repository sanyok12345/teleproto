import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class StarsSubscriptionPricing extends TLObject {
    static CONSTRUCTOR_ID = 88173912;
    static SUBCLASS_OF_ID = 3153574313;
    static className = "StarsSubscriptionPricing";
    static classType = "constructor";

    period!: number;
    amount!: bigint;

    constructor(args: { period?: number, amount?: bigint } = {}) {
        super();
        this.period = args.period!;
        this.amount = args.amount!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(88173912, false);
        writer.writeInt(this.period);
        writer.writeLargeInt(this.amount, 64);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): StarsSubscriptionPricing {
        const args: any = {};
        const _period = reader.readInt();
        args.period = _period;
        const _amount = reader.readLargeInt(64);
        args.amount = _amount;
        return new StarsSubscriptionPricing(args);
    }
}