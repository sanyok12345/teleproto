import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class StarGiftAuctionStateFinished extends TLObject {
    static CONSTRUCTOR_ID = 2536352703;
    static SUBCLASS_OF_ID = 580130043;
    static className = "StarGiftAuctionStateFinished";
    static classType = "constructor";

    flags!: number;
    startDate!: number;
    endDate!: number;
    averagePrice!: bigint;
    listedCount?: number;
    fragmentListedCount?: number;
    fragmentListedUrl?: string;

    constructor(args: { flags?: number, startDate?: number, endDate?: number, averagePrice?: bigint, listedCount?: number, fragmentListedCount?: number, fragmentListedUrl?: string } = {}) {
        super();
        this.flags = args.flags!;
        this.startDate = args.startDate!;
        this.endDate = args.endDate!;
        this.averagePrice = args.averagePrice!;
        this.listedCount = args.listedCount;
        this.fragmentListedCount = args.fragmentListedCount;
        this.fragmentListedUrl = args.fragmentListedUrl;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2536352703, false);
        let flags = 0;
        if (this.listedCount !== undefined && this.listedCount !== null) { flags |= 1 << 0; }
        if (this.fragmentListedCount !== undefined && this.fragmentListedCount !== null) { flags |= 1 << 1; }
        if (this.fragmentListedUrl !== undefined && this.fragmentListedUrl !== null) { flags |= 1 << 1; }
        writer.writeInt(flags, false);
        writer.writeInt(this.startDate);
        writer.writeInt(this.endDate);
        writer.writeLargeInt(this.averagePrice, 64);
        if (this.listedCount !== undefined && this.listedCount !== null) {
            writer.writeInt(this.listedCount);
        }
        if (this.fragmentListedCount !== undefined && this.fragmentListedCount !== null) {
            writer.writeInt(this.fragmentListedCount);
        }
        if (this.fragmentListedUrl !== undefined && this.fragmentListedUrl !== null) {
            writer.tgWriteString(this.fragmentListedUrl);
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): StarGiftAuctionStateFinished {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        const _startDate = reader.readInt();
        args.startDate = _startDate;
        const _endDate = reader.readInt();
        args.endDate = _endDate;
        const _averagePrice = reader.readLargeInt(64);
        args.averagePrice = _averagePrice;
        if (args.flags & (1 << 0)) {
            const _listedCount = reader.readInt();
            args.listedCount = _listedCount;
        } else {
            args.listedCount = undefined;
        }
        if (args.flags & (1 << 1)) {
            const _fragmentListedCount = reader.readInt();
            args.fragmentListedCount = _fragmentListedCount;
        } else {
            args.fragmentListedCount = undefined;
        }
        if (args.flags & (1 << 1)) {
            const _fragmentListedUrl = reader.tgReadString();
            args.fragmentListedUrl = _fragmentListedUrl;
        } else {
            args.fragmentListedUrl = undefined;
        }
        return new StarGiftAuctionStateFinished(args);
    }
}