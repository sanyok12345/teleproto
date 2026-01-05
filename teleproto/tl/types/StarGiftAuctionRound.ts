import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class StarGiftAuctionRound extends TLObject {
    static CONSTRUCTOR_ID = 984483112;
    static SUBCLASS_OF_ID = 1156131892;
    static className = "StarGiftAuctionRound";
    static classType = "constructor";

    num!: number;
    duration!: number;

    constructor(args: { num?: number, duration?: number } = {}) {
        super();
        this.num = args.num!;
        this.duration = args.duration!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(984483112, false);
        writer.writeInt(this.num);
        writer.writeInt(this.duration);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): StarGiftAuctionRound {
        const args: any = {};
        const _num = reader.readInt();
        args.num = _num;
        const _duration = reader.readInt();
        args.duration = _duration;
        return new StarGiftAuctionRound(args);
    }
}