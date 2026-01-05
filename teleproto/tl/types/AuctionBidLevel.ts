import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class AuctionBidLevel extends TLObject {
    static CONSTRUCTOR_ID = 822231244;
    static SUBCLASS_OF_ID = 3125037783;
    static className = "AuctionBidLevel";
    static classType = "constructor";

    pos!: number;
    amount!: bigint;
    date!: number;

    constructor(args: { pos?: number, amount?: bigint, date?: number } = {}) {
        super();
        this.pos = args.pos!;
        this.amount = args.amount!;
        this.date = args.date!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(822231244, false);
        writer.writeInt(this.pos);
        writer.writeLargeInt(this.amount, 64);
        writer.writeInt(this.date);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): AuctionBidLevel {
        const args: any = {};
        const _pos = reader.readInt();
        args.pos = _pos;
        const _amount = reader.readLargeInt(64);
        args.amount = _amount;
        const _date = reader.readInt();
        args.date = _date;
        return new AuctionBidLevel(args);
    }
}