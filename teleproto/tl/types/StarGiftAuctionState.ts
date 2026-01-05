import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeAuctionBidLevel } from "./TypeAuctionBidLevel";
import { TypeStarGiftAuctionRound } from "./TypeStarGiftAuctionRound";

export class StarGiftAuctionState extends TLObject {
    static CONSTRUCTOR_ID = 1998212710;
    static SUBCLASS_OF_ID = 580130043;
    static className = "StarGiftAuctionState";
    static classType = "constructor";

    version!: number;
    startDate!: number;
    endDate!: number;
    minBidAmount!: bigint;
    bidLevels!: TypeAuctionBidLevel[];
    topBidders!: bigint[];
    nextRoundAt!: number;
    lastGiftNum!: number;
    giftsLeft!: number;
    currentRound!: number;
    totalRounds!: number;
    rounds!: TypeStarGiftAuctionRound[];

    constructor(args: { version?: number, startDate?: number, endDate?: number, minBidAmount?: bigint, bidLevels?: TypeAuctionBidLevel[], topBidders?: bigint[], nextRoundAt?: number, lastGiftNum?: number, giftsLeft?: number, currentRound?: number, totalRounds?: number, rounds?: TypeStarGiftAuctionRound[] } = {}) {
        super();
        this.version = args.version!;
        this.startDate = args.startDate!;
        this.endDate = args.endDate!;
        this.minBidAmount = args.minBidAmount!;
        this.bidLevels = args.bidLevels!;
        this.topBidders = args.topBidders!;
        this.nextRoundAt = args.nextRoundAt!;
        this.lastGiftNum = args.lastGiftNum!;
        this.giftsLeft = args.giftsLeft!;
        this.currentRound = args.currentRound!;
        this.totalRounds = args.totalRounds!;
        this.rounds = args.rounds!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1998212710, false);
        writer.writeInt(this.version);
        writer.writeInt(this.startDate);
        writer.writeInt(this.endDate);
        writer.writeLargeInt(this.minBidAmount, 64);
        writer.writeVector(this.bidLevels, (item) => {
            writer.write(item.getBytes());
        });
        writer.writeVector(this.topBidders, (item) => {
            writer.writeLargeInt(item, 64);
        });
        writer.writeInt(this.nextRoundAt);
        writer.writeInt(this.lastGiftNum);
        writer.writeInt(this.giftsLeft);
        writer.writeInt(this.currentRound);
        writer.writeInt(this.totalRounds);
        writer.writeVector(this.rounds, (item) => {
            writer.write(item.getBytes());
        });
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): StarGiftAuctionState {
        const args: any = {};
        const _version = reader.readInt();
        args.version = _version;
        const _startDate = reader.readInt();
        args.startDate = _startDate;
        const _endDate = reader.readInt();
        args.endDate = _endDate;
        const _minBidAmount = reader.readLargeInt(64);
        args.minBidAmount = _minBidAmount;
        const _bidLevels = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.bidLevels = _bidLevels;
        const _topBidders = reader.readVector((reader) => {
            const item = reader.readLargeInt(64);
            return item;
        });
        args.topBidders = _topBidders;
        const _nextRoundAt = reader.readInt();
        args.nextRoundAt = _nextRoundAt;
        const _lastGiftNum = reader.readInt();
        args.lastGiftNum = _lastGiftNum;
        const _giftsLeft = reader.readInt();
        args.giftsLeft = _giftsLeft;
        const _currentRound = reader.readInt();
        args.currentRound = _currentRound;
        const _totalRounds = reader.readInt();
        args.totalRounds = _totalRounds;
        const _rounds = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.rounds = _rounds;
        return new StarGiftAuctionState(args);
    }
}