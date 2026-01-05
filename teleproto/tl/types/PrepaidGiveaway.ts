import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class PrepaidGiveaway extends TLObject {
    static CONSTRUCTOR_ID = 2991824212;
    static SUBCLASS_OF_ID = 3997067136;
    static className = "PrepaidGiveaway";
    static classType = "constructor";

    id!: bigint;
    months!: number;
    quantity!: number;
    date!: number;

    constructor(args: { id?: bigint, months?: number, quantity?: number, date?: number } = {}) {
        super();
        this.id = args.id!;
        this.months = args.months!;
        this.quantity = args.quantity!;
        this.date = args.date!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2991824212, false);
        writer.writeLargeInt(this.id, 64);
        writer.writeInt(this.months);
        writer.writeInt(this.quantity);
        writer.writeInt(this.date);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): PrepaidGiveaway {
        const args: any = {};
        const _id = reader.readLargeInt(64);
        args.id = _id;
        const _months = reader.readInt();
        args.months = _months;
        const _quantity = reader.readInt();
        args.quantity = _quantity;
        const _date = reader.readInt();
        args.date = _date;
        return new PrepaidGiveaway(args);
    }
}