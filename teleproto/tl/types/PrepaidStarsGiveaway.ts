import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class PrepaidStarsGiveaway extends TLObject {
    static CONSTRUCTOR_ID = 2594011104;
    static SUBCLASS_OF_ID = 3997067136;
    static className = "PrepaidStarsGiveaway";
    static classType = "constructor";

    id!: bigint;
    stars!: bigint;
    quantity!: number;
    boosts!: number;
    date!: number;

    constructor(args: { id?: bigint, stars?: bigint, quantity?: number, boosts?: number, date?: number } = {}) {
        super();
        this.id = args.id!;
        this.stars = args.stars!;
        this.quantity = args.quantity!;
        this.boosts = args.boosts!;
        this.date = args.date!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2594011104, false);
        writer.writeLargeInt(this.id, 64);
        writer.writeLargeInt(this.stars, 64);
        writer.writeInt(this.quantity);
        writer.writeInt(this.boosts);
        writer.writeInt(this.date);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): PrepaidStarsGiveaway {
        const args: any = {};
        const _id = reader.readLargeInt(64);
        args.id = _id;
        const _stars = reader.readLargeInt(64);
        args.stars = _stars;
        const _quantity = reader.readInt();
        args.quantity = _quantity;
        const _boosts = reader.readInt();
        args.boosts = _boosts;
        const _date = reader.readInt();
        args.date = _date;
        return new PrepaidStarsGiveaway(args);
    }
}