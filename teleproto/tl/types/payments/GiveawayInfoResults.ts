import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";

export class GiveawayInfoResults extends TLObject {
    static CONSTRUCTOR_ID = 3782600303;
    static SUBCLASS_OF_ID = 2527295421;
    static className = "payments.GiveawayInfoResults";
    static classType = "constructor";

    flags!: number;
    winner?: boolean;
    refunded?: boolean;
    startDate!: number;
    giftCodeSlug?: string;
    starsPrize?: bigint;
    finishDate!: number;
    winnersCount!: number;
    activatedCount?: number;

    constructor(args: { flags?: number, winner?: boolean, refunded?: boolean, startDate?: number, giftCodeSlug?: string, starsPrize?: bigint, finishDate?: number, winnersCount?: number, activatedCount?: number } = {}) {
        super();
        this.flags = args.flags!;
        this.winner = args.winner;
        this.refunded = args.refunded;
        this.startDate = args.startDate!;
        this.giftCodeSlug = args.giftCodeSlug;
        this.starsPrize = args.starsPrize;
        this.finishDate = args.finishDate!;
        this.winnersCount = args.winnersCount!;
        this.activatedCount = args.activatedCount;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3782600303, false);
        let flags = 0;
        if (this.winner) { flags |= 1 << 0; }
        if (this.refunded) { flags |= 1 << 1; }
        if (this.giftCodeSlug !== undefined && this.giftCodeSlug !== null) { flags |= 1 << 3; }
        if (this.starsPrize !== undefined && this.starsPrize !== null) { flags |= 1 << 4; }
        if (this.activatedCount !== undefined && this.activatedCount !== null) { flags |= 1 << 2; }
        writer.writeInt(flags, false);
        if (this.winner !== undefined && this.winner !== null) {
        }
        if (this.refunded !== undefined && this.refunded !== null) {
        }
        writer.writeInt(this.startDate);
        if (this.giftCodeSlug !== undefined && this.giftCodeSlug !== null) {
            writer.tgWriteString(this.giftCodeSlug);
        }
        if (this.starsPrize !== undefined && this.starsPrize !== null) {
            writer.writeLargeInt(this.starsPrize, 64);
        }
        writer.writeInt(this.finishDate);
        writer.writeInt(this.winnersCount);
        if (this.activatedCount !== undefined && this.activatedCount !== null) {
            writer.writeInt(this.activatedCount);
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): GiveawayInfoResults {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _winner = true;
            args.winner = _winner;
        } else {
            args.winner = false;
        }
        if (args.flags & (1 << 1)) {
            const _refunded = true;
            args.refunded = _refunded;
        } else {
            args.refunded = false;
        }
        const _startDate = reader.readInt();
        args.startDate = _startDate;
        if (args.flags & (1 << 3)) {
            const _giftCodeSlug = reader.tgReadString();
            args.giftCodeSlug = _giftCodeSlug;
        } else {
            args.giftCodeSlug = undefined;
        }
        if (args.flags & (1 << 4)) {
            const _starsPrize = reader.readLargeInt(64);
            args.starsPrize = _starsPrize;
        } else {
            args.starsPrize = undefined;
        }
        const _finishDate = reader.readInt();
        args.finishDate = _finishDate;
        const _winnersCount = reader.readInt();
        args.winnersCount = _winnersCount;
        if (args.flags & (1 << 2)) {
            const _activatedCount = reader.readInt();
            args.activatedCount = _activatedCount;
        } else {
            args.activatedCount = undefined;
        }
        return new GiveawayInfoResults(args);
    }
}