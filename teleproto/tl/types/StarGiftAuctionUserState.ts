import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypePeer } from "./TypePeer";

export class StarGiftAuctionUserState extends TLObject {
    static CONSTRUCTOR_ID = 787403204;
    static SUBCLASS_OF_ID = 86642350;
    static className = "StarGiftAuctionUserState";
    static classType = "constructor";

    flags!: number;
    returned?: boolean;
    bidAmount?: bigint;
    bidDate?: number;
    minBidAmount?: bigint;
    bidPeer?: TypePeer;
    acquiredCount!: number;

    constructor(args: { flags?: number, returned?: boolean, bidAmount?: bigint, bidDate?: number, minBidAmount?: bigint, bidPeer?: TypePeer, acquiredCount?: number } = {}) {
        super();
        this.flags = args.flags!;
        this.returned = args.returned;
        this.bidAmount = args.bidAmount;
        this.bidDate = args.bidDate;
        this.minBidAmount = args.minBidAmount;
        this.bidPeer = args.bidPeer;
        this.acquiredCount = args.acquiredCount!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(787403204, false);
        let flags = 0;
        if (this.returned) { flags |= 1 << 1; }
        if (this.bidAmount !== undefined && this.bidAmount !== null) { flags |= 1 << 0; }
        if (this.bidDate !== undefined && this.bidDate !== null) { flags |= 1 << 0; }
        if (this.minBidAmount !== undefined && this.minBidAmount !== null) { flags |= 1 << 0; }
        if (this.bidPeer !== undefined && this.bidPeer !== null) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        if (this.returned !== undefined && this.returned !== null) {
        }
        if (this.bidAmount !== undefined && this.bidAmount !== null) {
            writer.writeLargeInt(this.bidAmount, 64);
        }
        if (this.bidDate !== undefined && this.bidDate !== null) {
            writer.writeInt(this.bidDate);
        }
        if (this.minBidAmount !== undefined && this.minBidAmount !== null) {
            writer.writeLargeInt(this.minBidAmount, 64);
        }
        if (this.bidPeer !== undefined && this.bidPeer !== null) {
            writer.write(this.bidPeer.getBytes());
        }
        writer.writeInt(this.acquiredCount);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): StarGiftAuctionUserState {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 1)) {
            const _returned = true;
            args.returned = _returned;
        } else {
            args.returned = false;
        }
        if (args.flags & (1 << 0)) {
            const _bidAmount = reader.readLargeInt(64);
            args.bidAmount = _bidAmount;
        } else {
            args.bidAmount = undefined;
        }
        if (args.flags & (1 << 0)) {
            const _bidDate = reader.readInt();
            args.bidDate = _bidDate;
        } else {
            args.bidDate = undefined;
        }
        if (args.flags & (1 << 0)) {
            const _minBidAmount = reader.readLargeInt(64);
            args.minBidAmount = _minBidAmount;
        } else {
            args.minBidAmount = undefined;
        }
        if (args.flags & (1 << 0)) {
            const _bidPeer = reader.tgReadObject();
            args.bidPeer = _bidPeer;
        } else {
            args.bidPeer = undefined;
        }
        const _acquiredCount = reader.readInt();
        args.acquiredCount = _acquiredCount;
        return new StarGiftAuctionUserState(args);
    }
}