import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";
import { TypeStatsPercentValue } from "../TypeStatsPercentValue";
import { TypePrepaidGiveaway } from "../TypePrepaidGiveaway";

export class BoostsStatus extends TLObject {
    static CONSTRUCTOR_ID = 1230586490;
    static SUBCLASS_OF_ID = 3273333433;
    static className = "premium.BoostsStatus";
    static classType = "constructor";

    flags!: number;
    myBoost?: boolean;
    level!: number;
    currentLevelBoosts!: number;
    boosts!: number;
    giftBoosts?: number;
    nextLevelBoosts?: number;
    premiumAudience?: TypeStatsPercentValue;
    boostUrl!: string;
    prepaidGiveaways?: TypePrepaidGiveaway[];
    myBoostSlots?: number[];

    constructor(args: { flags?: number, myBoost?: boolean, level?: number, currentLevelBoosts?: number, boosts?: number, giftBoosts?: number, nextLevelBoosts?: number, premiumAudience?: TypeStatsPercentValue, boostUrl?: string, prepaidGiveaways?: TypePrepaidGiveaway[], myBoostSlots?: number[] } = {}) {
        super();
        this.flags = args.flags!;
        this.myBoost = args.myBoost;
        this.level = args.level!;
        this.currentLevelBoosts = args.currentLevelBoosts!;
        this.boosts = args.boosts!;
        this.giftBoosts = args.giftBoosts;
        this.nextLevelBoosts = args.nextLevelBoosts;
        this.premiumAudience = args.premiumAudience;
        this.boostUrl = args.boostUrl!;
        this.prepaidGiveaways = args.prepaidGiveaways;
        this.myBoostSlots = args.myBoostSlots;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1230586490, false);
        let flags = 0;
        if (this.myBoost) { flags |= 1 << 2; }
        if (this.giftBoosts !== undefined && this.giftBoosts !== null) { flags |= 1 << 4; }
        if (this.nextLevelBoosts !== undefined && this.nextLevelBoosts !== null) { flags |= 1 << 0; }
        if (this.premiumAudience !== undefined && this.premiumAudience !== null) { flags |= 1 << 1; }
        if (this.prepaidGiveaways !== undefined && this.prepaidGiveaways !== null) { flags |= 1 << 3; }
        if (this.myBoostSlots !== undefined && this.myBoostSlots !== null) { flags |= 1 << 2; }
        writer.writeInt(flags, false);
        if (this.myBoost !== undefined && this.myBoost !== null) {
        }
        writer.writeInt(this.level);
        writer.writeInt(this.currentLevelBoosts);
        writer.writeInt(this.boosts);
        if (this.giftBoosts !== undefined && this.giftBoosts !== null) {
            writer.writeInt(this.giftBoosts);
        }
        if (this.nextLevelBoosts !== undefined && this.nextLevelBoosts !== null) {
            writer.writeInt(this.nextLevelBoosts);
        }
        if (this.premiumAudience !== undefined && this.premiumAudience !== null) {
            writer.write(this.premiumAudience.getBytes());
        }
        writer.tgWriteString(this.boostUrl);
        if (this.prepaidGiveaways !== undefined && this.prepaidGiveaways !== null) {
            writer.writeVector(this.prepaidGiveaways, (item) => {
                writer.write(item.getBytes());
            });
        }
        if (this.myBoostSlots !== undefined && this.myBoostSlots !== null) {
            writer.writeVector(this.myBoostSlots, (item) => {
                writer.writeInt(item);
            });
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): BoostsStatus {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 2)) {
            const _myBoost = true;
            args.myBoost = _myBoost;
        } else {
            args.myBoost = false;
        }
        const _level = reader.readInt();
        args.level = _level;
        const _currentLevelBoosts = reader.readInt();
        args.currentLevelBoosts = _currentLevelBoosts;
        const _boosts = reader.readInt();
        args.boosts = _boosts;
        if (args.flags & (1 << 4)) {
            const _giftBoosts = reader.readInt();
            args.giftBoosts = _giftBoosts;
        } else {
            args.giftBoosts = undefined;
        }
        if (args.flags & (1 << 0)) {
            const _nextLevelBoosts = reader.readInt();
            args.nextLevelBoosts = _nextLevelBoosts;
        } else {
            args.nextLevelBoosts = undefined;
        }
        if (args.flags & (1 << 1)) {
            const _premiumAudience = reader.tgReadObject();
            args.premiumAudience = _premiumAudience;
        } else {
            args.premiumAudience = undefined;
        }
        const _boostUrl = reader.tgReadString();
        args.boostUrl = _boostUrl;
        if (args.flags & (1 << 3)) {
            const _prepaidGiveaways = reader.readVector((reader) => {
                const item = reader.tgReadObject();
                return item;
            });
            args.prepaidGiveaways = _prepaidGiveaways;
        } else {
            args.prepaidGiveaways = undefined;
        }
        if (args.flags & (1 << 2)) {
            const _myBoostSlots = reader.readVector((reader) => {
                const item = reader.readInt();
                return item;
            });
            args.myBoostSlots = _myBoostSlots;
        } else {
            args.myBoostSlots = undefined;
        }
        return new BoostsStatus(args);
    }
}