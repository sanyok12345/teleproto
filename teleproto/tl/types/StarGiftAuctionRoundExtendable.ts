import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class StarGiftAuctionRoundExtendable extends TLObject {
    static CONSTRUCTOR_ID = 178266597;
    static SUBCLASS_OF_ID = 1156131892;
    static className = "StarGiftAuctionRoundExtendable";
    static classType = "constructor";

    num!: number;
    duration!: number;
    extendTop!: number;
    extendWindow!: number;

    constructor(args: { num?: number, duration?: number, extendTop?: number, extendWindow?: number } = {}) {
        super();
        this.num = args.num!;
        this.duration = args.duration!;
        this.extendTop = args.extendTop!;
        this.extendWindow = args.extendWindow!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(178266597, false);
        writer.writeInt(this.num);
        writer.writeInt(this.duration);
        writer.writeInt(this.extendTop);
        writer.writeInt(this.extendWindow);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): StarGiftAuctionRoundExtendable {
        const args: any = {};
        const _num = reader.readInt();
        args.num = _num;
        const _duration = reader.readInt();
        args.duration = _duration;
        const _extendTop = reader.readInt();
        args.extendTop = _extendTop;
        const _extendWindow = reader.readInt();
        args.extendWindow = _extendWindow;
        return new StarGiftAuctionRoundExtendable(args);
    }
}