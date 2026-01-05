import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class Boost extends TLObject {
    static CONSTRUCTOR_ID = 1262359766;
    static SUBCLASS_OF_ID = 2544175212;
    static className = "Boost";
    static classType = "constructor";

    flags!: number;
    gift?: boolean;
    giveaway?: boolean;
    unclaimed?: boolean;
    id!: string;
    userId?: bigint;
    giveawayMsgId?: number;
    date!: number;
    expires!: number;
    usedGiftSlug?: string;
    multiplier?: number;
    stars?: bigint;

    constructor(args: { flags?: number, gift?: boolean, giveaway?: boolean, unclaimed?: boolean, id?: string, userId?: bigint, giveawayMsgId?: number, date?: number, expires?: number, usedGiftSlug?: string, multiplier?: number, stars?: bigint } = {}) {
        super();
        this.flags = args.flags!;
        this.gift = args.gift;
        this.giveaway = args.giveaway;
        this.unclaimed = args.unclaimed;
        this.id = args.id!;
        this.userId = args.userId;
        this.giveawayMsgId = args.giveawayMsgId;
        this.date = args.date!;
        this.expires = args.expires!;
        this.usedGiftSlug = args.usedGiftSlug;
        this.multiplier = args.multiplier;
        this.stars = args.stars;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1262359766, false);
        let flags = 0;
        if (this.gift) { flags |= 1 << 1; }
        if (this.giveaway) { flags |= 1 << 2; }
        if (this.unclaimed) { flags |= 1 << 3; }
        if (this.userId !== undefined && this.userId !== null) { flags |= 1 << 0; }
        if (this.giveawayMsgId !== undefined && this.giveawayMsgId !== null) { flags |= 1 << 2; }
        if (this.usedGiftSlug !== undefined && this.usedGiftSlug !== null) { flags |= 1 << 4; }
        if (this.multiplier !== undefined && this.multiplier !== null) { flags |= 1 << 5; }
        if (this.stars !== undefined && this.stars !== null) { flags |= 1 << 6; }
        writer.writeInt(flags, false);
        if (this.gift !== undefined && this.gift !== null) {
        }
        if (this.giveaway !== undefined && this.giveaway !== null) {
        }
        if (this.unclaimed !== undefined && this.unclaimed !== null) {
        }
        writer.tgWriteString(this.id);
        if (this.userId !== undefined && this.userId !== null) {
            writer.writeLargeInt(this.userId, 64);
        }
        if (this.giveawayMsgId !== undefined && this.giveawayMsgId !== null) {
            writer.writeInt(this.giveawayMsgId);
        }
        writer.writeInt(this.date);
        writer.writeInt(this.expires);
        if (this.usedGiftSlug !== undefined && this.usedGiftSlug !== null) {
            writer.tgWriteString(this.usedGiftSlug);
        }
        if (this.multiplier !== undefined && this.multiplier !== null) {
            writer.writeInt(this.multiplier);
        }
        if (this.stars !== undefined && this.stars !== null) {
            writer.writeLargeInt(this.stars, 64);
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): Boost {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 1)) {
            const _gift = true;
            args.gift = _gift;
        } else {
            args.gift = false;
        }
        if (args.flags & (1 << 2)) {
            const _giveaway = true;
            args.giveaway = _giveaway;
        } else {
            args.giveaway = false;
        }
        if (args.flags & (1 << 3)) {
            const _unclaimed = true;
            args.unclaimed = _unclaimed;
        } else {
            args.unclaimed = false;
        }
        const _id = reader.tgReadString();
        args.id = _id;
        if (args.flags & (1 << 0)) {
            const _userId = reader.readLargeInt(64);
            args.userId = _userId;
        } else {
            args.userId = undefined;
        }
        if (args.flags & (1 << 2)) {
            const _giveawayMsgId = reader.readInt();
            args.giveawayMsgId = _giveawayMsgId;
        } else {
            args.giveawayMsgId = undefined;
        }
        const _date = reader.readInt();
        args.date = _date;
        const _expires = reader.readInt();
        args.expires = _expires;
        if (args.flags & (1 << 4)) {
            const _usedGiftSlug = reader.tgReadString();
            args.usedGiftSlug = _usedGiftSlug;
        } else {
            args.usedGiftSlug = undefined;
        }
        if (args.flags & (1 << 5)) {
            const _multiplier = reader.readInt();
            args.multiplier = _multiplier;
        } else {
            args.multiplier = undefined;
        }
        if (args.flags & (1 << 6)) {
            const _stars = reader.readLargeInt(64);
            args.stars = _stars;
        } else {
            args.stars = undefined;
        }
        return new Boost(args);
    }
}