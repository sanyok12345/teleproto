import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypePeer } from "./TypePeer";
import { TypeTextWithEntities } from "./TypeTextWithEntities";

export class StarGiftAuctionAcquiredGift extends TLObject {
    static CONSTRUCTOR_ID = 1118831432;
    static SUBCLASS_OF_ID = 655184435;
    static className = "StarGiftAuctionAcquiredGift";
    static classType = "constructor";

    flags!: number;
    nameHidden?: boolean;
    peer!: TypePeer;
    date!: number;
    bidAmount!: bigint;
    round!: number;
    pos!: number;
    message?: TypeTextWithEntities;
    giftNum?: number;

    constructor(args: { flags?: number, nameHidden?: boolean, peer?: TypePeer, date?: number, bidAmount?: bigint, round?: number, pos?: number, message?: TypeTextWithEntities, giftNum?: number } = {}) {
        super();
        this.flags = args.flags!;
        this.nameHidden = args.nameHidden;
        this.peer = args.peer!;
        this.date = args.date!;
        this.bidAmount = args.bidAmount!;
        this.round = args.round!;
        this.pos = args.pos!;
        this.message = args.message;
        this.giftNum = args.giftNum;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1118831432, false);
        let flags = 0;
        if (this.nameHidden) { flags |= 1 << 0; }
        if (this.message !== undefined && this.message !== null) { flags |= 1 << 1; }
        if (this.giftNum !== undefined && this.giftNum !== null) { flags |= 1 << 2; }
        writer.writeInt(flags, false);
        if (this.nameHidden !== undefined && this.nameHidden !== null) {
        }
        writer.write(this.peer.getBytes());
        writer.writeInt(this.date);
        writer.writeLargeInt(this.bidAmount, 64);
        writer.writeInt(this.round);
        writer.writeInt(this.pos);
        if (this.message !== undefined && this.message !== null) {
            writer.write(this.message.getBytes());
        }
        if (this.giftNum !== undefined && this.giftNum !== null) {
            writer.writeInt(this.giftNum);
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): StarGiftAuctionAcquiredGift {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _nameHidden = true;
            args.nameHidden = _nameHidden;
        } else {
            args.nameHidden = false;
        }
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        const _date = reader.readInt();
        args.date = _date;
        const _bidAmount = reader.readLargeInt(64);
        args.bidAmount = _bidAmount;
        const _round = reader.readInt();
        args.round = _round;
        const _pos = reader.readInt();
        args.pos = _pos;
        if (args.flags & (1 << 1)) {
            const _message = reader.tgReadObject();
            args.message = _message;
        } else {
            args.message = undefined;
        }
        if (args.flags & (1 << 2)) {
            const _giftNum = reader.readInt();
            args.giftNum = _giftNum;
        } else {
            args.giftNum = undefined;
        }
        return new StarGiftAuctionAcquiredGift(args);
    }
}