import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class MessageMediaGiveawayResults extends TLObject {
    static CONSTRUCTOR_ID = 3467263649;
    static SUBCLASS_OF_ID = 1198308914;
    static className = "MessageMediaGiveawayResults";
    static classType = "constructor";

    flags!: number;
    onlyNewSubscribers?: boolean;
    refunded?: boolean;
    channelId!: bigint;
    additionalPeersCount?: number;
    launchMsgId!: number;
    winnersCount!: number;
    unclaimedCount!: number;
    winners!: bigint[];
    months?: number;
    stars?: bigint;
    prizeDescription?: string;
    untilDate!: number;

    constructor(args: { flags?: number, onlyNewSubscribers?: boolean, refunded?: boolean, channelId?: bigint, additionalPeersCount?: number, launchMsgId?: number, winnersCount?: number, unclaimedCount?: number, winners?: bigint[], months?: number, stars?: bigint, prizeDescription?: string, untilDate?: number } = {}) {
        super();
        this.flags = args.flags!;
        this.onlyNewSubscribers = args.onlyNewSubscribers;
        this.refunded = args.refunded;
        this.channelId = args.channelId!;
        this.additionalPeersCount = args.additionalPeersCount;
        this.launchMsgId = args.launchMsgId!;
        this.winnersCount = args.winnersCount!;
        this.unclaimedCount = args.unclaimedCount!;
        this.winners = args.winners!;
        this.months = args.months;
        this.stars = args.stars;
        this.prizeDescription = args.prizeDescription;
        this.untilDate = args.untilDate!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3467263649, false);
        let flags = 0;
        if (this.onlyNewSubscribers) { flags |= 1 << 0; }
        if (this.refunded) { flags |= 1 << 2; }
        if (this.additionalPeersCount !== undefined && this.additionalPeersCount !== null) { flags |= 1 << 3; }
        if (this.months !== undefined && this.months !== null) { flags |= 1 << 4; }
        if (this.stars !== undefined && this.stars !== null) { flags |= 1 << 5; }
        if (this.prizeDescription !== undefined && this.prizeDescription !== null) { flags |= 1 << 1; }
        writer.writeInt(flags, false);
        if (this.onlyNewSubscribers !== undefined && this.onlyNewSubscribers !== null) {
        }
        if (this.refunded !== undefined && this.refunded !== null) {
        }
        writer.writeLargeInt(this.channelId, 64);
        if (this.additionalPeersCount !== undefined && this.additionalPeersCount !== null) {
            writer.writeInt(this.additionalPeersCount);
        }
        writer.writeInt(this.launchMsgId);
        writer.writeInt(this.winnersCount);
        writer.writeInt(this.unclaimedCount);
        writer.writeVector(this.winners, (item) => {
            writer.writeLargeInt(item, 64);
        });
        if (this.months !== undefined && this.months !== null) {
            writer.writeInt(this.months);
        }
        if (this.stars !== undefined && this.stars !== null) {
            writer.writeLargeInt(this.stars, 64);
        }
        if (this.prizeDescription !== undefined && this.prizeDescription !== null) {
            writer.tgWriteString(this.prizeDescription);
        }
        writer.writeInt(this.untilDate);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): MessageMediaGiveawayResults {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _onlyNewSubscribers = true;
            args.onlyNewSubscribers = _onlyNewSubscribers;
        } else {
            args.onlyNewSubscribers = false;
        }
        if (args.flags & (1 << 2)) {
            const _refunded = true;
            args.refunded = _refunded;
        } else {
            args.refunded = false;
        }
        const _channelId = reader.readLargeInt(64);
        args.channelId = _channelId;
        if (args.flags & (1 << 3)) {
            const _additionalPeersCount = reader.readInt();
            args.additionalPeersCount = _additionalPeersCount;
        } else {
            args.additionalPeersCount = undefined;
        }
        const _launchMsgId = reader.readInt();
        args.launchMsgId = _launchMsgId;
        const _winnersCount = reader.readInt();
        args.winnersCount = _winnersCount;
        const _unclaimedCount = reader.readInt();
        args.unclaimedCount = _unclaimedCount;
        const _winners = reader.readVector((reader) => {
            const item = reader.readLargeInt(64);
            return item;
        });
        args.winners = _winners;
        if (args.flags & (1 << 4)) {
            const _months = reader.readInt();
            args.months = _months;
        } else {
            args.months = undefined;
        }
        if (args.flags & (1 << 5)) {
            const _stars = reader.readLargeInt(64);
            args.stars = _stars;
        } else {
            args.stars = undefined;
        }
        if (args.flags & (1 << 1)) {
            const _prizeDescription = reader.tgReadString();
            args.prizeDescription = _prizeDescription;
        } else {
            args.prizeDescription = undefined;
        }
        const _untilDate = reader.readInt();
        args.untilDate = _untilDate;
        return new MessageMediaGiveawayResults(args);
    }
}