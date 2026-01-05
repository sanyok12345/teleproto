import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeDocument } from "./TypeDocument";
import { TypePeer } from "./TypePeer";
import { TypeStarGiftBackground } from "./TypeStarGiftBackground";

export class StarGift extends TLObject {
    static CONSTRUCTOR_ID = 825922887;
    static SUBCLASS_OF_ID = 3273414923;
    static className = "StarGift";
    static classType = "constructor";

    flags!: number;
    limited?: boolean;
    soldOut?: boolean;
    birthday?: boolean;
    requirePremium?: boolean;
    limitedPerUser?: boolean;
    peerColorAvailable?: boolean;
    auction?: boolean;
    id!: bigint;
    sticker!: TypeDocument;
    stars!: bigint;
    availabilityRemains?: number;
    availabilityTotal?: number;
    availabilityResale?: bigint;
    convertStars!: bigint;
    firstSaleDate?: number;
    lastSaleDate?: number;
    upgradeStars?: bigint;
    resellMinStars?: bigint;
    title?: string;
    releasedBy?: TypePeer;
    perUserTotal?: number;
    perUserRemains?: number;
    lockedUntilDate?: number;
    auctionSlug?: string;
    giftsPerRound?: number;
    auctionStartDate?: number;
    upgradeVariants?: number;
    background?: TypeStarGiftBackground;

    constructor(args: { flags?: number, limited?: boolean, soldOut?: boolean, birthday?: boolean, requirePremium?: boolean, limitedPerUser?: boolean, peerColorAvailable?: boolean, auction?: boolean, id?: bigint, sticker?: TypeDocument, stars?: bigint, availabilityRemains?: number, availabilityTotal?: number, availabilityResale?: bigint, convertStars?: bigint, firstSaleDate?: number, lastSaleDate?: number, upgradeStars?: bigint, resellMinStars?: bigint, title?: string, releasedBy?: TypePeer, perUserTotal?: number, perUserRemains?: number, lockedUntilDate?: number, auctionSlug?: string, giftsPerRound?: number, auctionStartDate?: number, upgradeVariants?: number, background?: TypeStarGiftBackground } = {}) {
        super();
        this.flags = args.flags!;
        this.limited = args.limited;
        this.soldOut = args.soldOut;
        this.birthday = args.birthday;
        this.requirePremium = args.requirePremium;
        this.limitedPerUser = args.limitedPerUser;
        this.peerColorAvailable = args.peerColorAvailable;
        this.auction = args.auction;
        this.id = args.id!;
        this.sticker = args.sticker!;
        this.stars = args.stars!;
        this.availabilityRemains = args.availabilityRemains;
        this.availabilityTotal = args.availabilityTotal;
        this.availabilityResale = args.availabilityResale;
        this.convertStars = args.convertStars!;
        this.firstSaleDate = args.firstSaleDate;
        this.lastSaleDate = args.lastSaleDate;
        this.upgradeStars = args.upgradeStars;
        this.resellMinStars = args.resellMinStars;
        this.title = args.title;
        this.releasedBy = args.releasedBy;
        this.perUserTotal = args.perUserTotal;
        this.perUserRemains = args.perUserRemains;
        this.lockedUntilDate = args.lockedUntilDate;
        this.auctionSlug = args.auctionSlug;
        this.giftsPerRound = args.giftsPerRound;
        this.auctionStartDate = args.auctionStartDate;
        this.upgradeVariants = args.upgradeVariants;
        this.background = args.background;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(825922887, false);
        let flags = 0;
        if (this.limited) { flags |= 1 << 0; }
        if (this.soldOut) { flags |= 1 << 1; }
        if (this.birthday) { flags |= 1 << 2; }
        if (this.requirePremium) { flags |= 1 << 7; }
        if (this.limitedPerUser) { flags |= 1 << 8; }
        if (this.peerColorAvailable) { flags |= 1 << 10; }
        if (this.auction) { flags |= 1 << 11; }
        if (this.availabilityRemains !== undefined && this.availabilityRemains !== null) { flags |= 1 << 0; }
        if (this.availabilityTotal !== undefined && this.availabilityTotal !== null) { flags |= 1 << 0; }
        if (this.availabilityResale !== undefined && this.availabilityResale !== null) { flags |= 1 << 4; }
        if (this.firstSaleDate !== undefined && this.firstSaleDate !== null) { flags |= 1 << 1; }
        if (this.lastSaleDate !== undefined && this.lastSaleDate !== null) { flags |= 1 << 1; }
        if (this.upgradeStars !== undefined && this.upgradeStars !== null) { flags |= 1 << 3; }
        if (this.resellMinStars !== undefined && this.resellMinStars !== null) { flags |= 1 << 4; }
        if (this.title !== undefined && this.title !== null) { flags |= 1 << 5; }
        if (this.releasedBy !== undefined && this.releasedBy !== null) { flags |= 1 << 6; }
        if (this.perUserTotal !== undefined && this.perUserTotal !== null) { flags |= 1 << 8; }
        if (this.perUserRemains !== undefined && this.perUserRemains !== null) { flags |= 1 << 8; }
        if (this.lockedUntilDate !== undefined && this.lockedUntilDate !== null) { flags |= 1 << 9; }
        if (this.auctionSlug !== undefined && this.auctionSlug !== null) { flags |= 1 << 11; }
        if (this.giftsPerRound !== undefined && this.giftsPerRound !== null) { flags |= 1 << 11; }
        if (this.auctionStartDate !== undefined && this.auctionStartDate !== null) { flags |= 1 << 11; }
        if (this.upgradeVariants !== undefined && this.upgradeVariants !== null) { flags |= 1 << 12; }
        if (this.background !== undefined && this.background !== null) { flags |= 1 << 13; }
        writer.writeInt(flags, false);
        if (this.limited !== undefined && this.limited !== null) {
        }
        if (this.soldOut !== undefined && this.soldOut !== null) {
        }
        if (this.birthday !== undefined && this.birthday !== null) {
        }
        if (this.requirePremium !== undefined && this.requirePremium !== null) {
        }
        if (this.limitedPerUser !== undefined && this.limitedPerUser !== null) {
        }
        if (this.peerColorAvailable !== undefined && this.peerColorAvailable !== null) {
        }
        if (this.auction !== undefined && this.auction !== null) {
        }
        writer.writeLargeInt(this.id, 64);
        writer.write(this.sticker.getBytes());
        writer.writeLargeInt(this.stars, 64);
        if (this.availabilityRemains !== undefined && this.availabilityRemains !== null) {
            writer.writeInt(this.availabilityRemains);
        }
        if (this.availabilityTotal !== undefined && this.availabilityTotal !== null) {
            writer.writeInt(this.availabilityTotal);
        }
        if (this.availabilityResale !== undefined && this.availabilityResale !== null) {
            writer.writeLargeInt(this.availabilityResale, 64);
        }
        writer.writeLargeInt(this.convertStars, 64);
        if (this.firstSaleDate !== undefined && this.firstSaleDate !== null) {
            writer.writeInt(this.firstSaleDate);
        }
        if (this.lastSaleDate !== undefined && this.lastSaleDate !== null) {
            writer.writeInt(this.lastSaleDate);
        }
        if (this.upgradeStars !== undefined && this.upgradeStars !== null) {
            writer.writeLargeInt(this.upgradeStars, 64);
        }
        if (this.resellMinStars !== undefined && this.resellMinStars !== null) {
            writer.writeLargeInt(this.resellMinStars, 64);
        }
        if (this.title !== undefined && this.title !== null) {
            writer.tgWriteString(this.title);
        }
        if (this.releasedBy !== undefined && this.releasedBy !== null) {
            writer.write(this.releasedBy.getBytes());
        }
        if (this.perUserTotal !== undefined && this.perUserTotal !== null) {
            writer.writeInt(this.perUserTotal);
        }
        if (this.perUserRemains !== undefined && this.perUserRemains !== null) {
            writer.writeInt(this.perUserRemains);
        }
        if (this.lockedUntilDate !== undefined && this.lockedUntilDate !== null) {
            writer.writeInt(this.lockedUntilDate);
        }
        if (this.auctionSlug !== undefined && this.auctionSlug !== null) {
            writer.tgWriteString(this.auctionSlug);
        }
        if (this.giftsPerRound !== undefined && this.giftsPerRound !== null) {
            writer.writeInt(this.giftsPerRound);
        }
        if (this.auctionStartDate !== undefined && this.auctionStartDate !== null) {
            writer.writeInt(this.auctionStartDate);
        }
        if (this.upgradeVariants !== undefined && this.upgradeVariants !== null) {
            writer.writeInt(this.upgradeVariants);
        }
        if (this.background !== undefined && this.background !== null) {
            writer.write(this.background.getBytes());
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): StarGift {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _limited = true;
            args.limited = _limited;
        } else {
            args.limited = false;
        }
        if (args.flags & (1 << 1)) {
            const _soldOut = true;
            args.soldOut = _soldOut;
        } else {
            args.soldOut = false;
        }
        if (args.flags & (1 << 2)) {
            const _birthday = true;
            args.birthday = _birthday;
        } else {
            args.birthday = false;
        }
        if (args.flags & (1 << 7)) {
            const _requirePremium = true;
            args.requirePremium = _requirePremium;
        } else {
            args.requirePremium = false;
        }
        if (args.flags & (1 << 8)) {
            const _limitedPerUser = true;
            args.limitedPerUser = _limitedPerUser;
        } else {
            args.limitedPerUser = false;
        }
        if (args.flags & (1 << 10)) {
            const _peerColorAvailable = true;
            args.peerColorAvailable = _peerColorAvailable;
        } else {
            args.peerColorAvailable = false;
        }
        if (args.flags & (1 << 11)) {
            const _auction = true;
            args.auction = _auction;
        } else {
            args.auction = false;
        }
        const _id = reader.readLargeInt(64);
        args.id = _id;
        const _sticker = reader.tgReadObject();
        args.sticker = _sticker;
        const _stars = reader.readLargeInt(64);
        args.stars = _stars;
        if (args.flags & (1 << 0)) {
            const _availabilityRemains = reader.readInt();
            args.availabilityRemains = _availabilityRemains;
        } else {
            args.availabilityRemains = undefined;
        }
        if (args.flags & (1 << 0)) {
            const _availabilityTotal = reader.readInt();
            args.availabilityTotal = _availabilityTotal;
        } else {
            args.availabilityTotal = undefined;
        }
        if (args.flags & (1 << 4)) {
            const _availabilityResale = reader.readLargeInt(64);
            args.availabilityResale = _availabilityResale;
        } else {
            args.availabilityResale = undefined;
        }
        const _convertStars = reader.readLargeInt(64);
        args.convertStars = _convertStars;
        if (args.flags & (1 << 1)) {
            const _firstSaleDate = reader.readInt();
            args.firstSaleDate = _firstSaleDate;
        } else {
            args.firstSaleDate = undefined;
        }
        if (args.flags & (1 << 1)) {
            const _lastSaleDate = reader.readInt();
            args.lastSaleDate = _lastSaleDate;
        } else {
            args.lastSaleDate = undefined;
        }
        if (args.flags & (1 << 3)) {
            const _upgradeStars = reader.readLargeInt(64);
            args.upgradeStars = _upgradeStars;
        } else {
            args.upgradeStars = undefined;
        }
        if (args.flags & (1 << 4)) {
            const _resellMinStars = reader.readLargeInt(64);
            args.resellMinStars = _resellMinStars;
        } else {
            args.resellMinStars = undefined;
        }
        if (args.flags & (1 << 5)) {
            const _title = reader.tgReadString();
            args.title = _title;
        } else {
            args.title = undefined;
        }
        if (args.flags & (1 << 6)) {
            const _releasedBy = reader.tgReadObject();
            args.releasedBy = _releasedBy;
        } else {
            args.releasedBy = undefined;
        }
        if (args.flags & (1 << 8)) {
            const _perUserTotal = reader.readInt();
            args.perUserTotal = _perUserTotal;
        } else {
            args.perUserTotal = undefined;
        }
        if (args.flags & (1 << 8)) {
            const _perUserRemains = reader.readInt();
            args.perUserRemains = _perUserRemains;
        } else {
            args.perUserRemains = undefined;
        }
        if (args.flags & (1 << 9)) {
            const _lockedUntilDate = reader.readInt();
            args.lockedUntilDate = _lockedUntilDate;
        } else {
            args.lockedUntilDate = undefined;
        }
        if (args.flags & (1 << 11)) {
            const _auctionSlug = reader.tgReadString();
            args.auctionSlug = _auctionSlug;
        } else {
            args.auctionSlug = undefined;
        }
        if (args.flags & (1 << 11)) {
            const _giftsPerRound = reader.readInt();
            args.giftsPerRound = _giftsPerRound;
        } else {
            args.giftsPerRound = undefined;
        }
        if (args.flags & (1 << 11)) {
            const _auctionStartDate = reader.readInt();
            args.auctionStartDate = _auctionStartDate;
        } else {
            args.auctionStartDate = undefined;
        }
        if (args.flags & (1 << 12)) {
            const _upgradeVariants = reader.readInt();
            args.upgradeVariants = _upgradeVariants;
        } else {
            args.upgradeVariants = undefined;
        }
        if (args.flags & (1 << 13)) {
            const _background = reader.tgReadObject();
            args.background = _background;
        } else {
            args.background = undefined;
        }
        return new StarGift(args);
    }
}