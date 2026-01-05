import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeStarsAmount } from "./TypeStarsAmount";
import { TypeStarsTransactionPeer } from "./TypeStarsTransactionPeer";
import { TypeWebDocument } from "./TypeWebDocument";
import { MessageIDLike } from "./../../define";
import { TypeMessageMedia } from "./TypeMessageMedia";
import { TypeStarGift } from "./TypeStarGift";
import { TypePeer } from "./TypePeer";

export class StarsTransaction extends TLObject {
    static CONSTRUCTOR_ID = 325426864;
    static SUBCLASS_OF_ID = 2257078130;
    static className = "StarsTransaction";
    static classType = "constructor";

    flags!: number;
    refund?: boolean;
    pending?: boolean;
    failed?: boolean;
    gift?: boolean;
    reaction?: boolean;
    stargiftUpgrade?: boolean;
    businessTransfer?: boolean;
    stargiftResale?: boolean;
    postsSearch?: boolean;
    stargiftPrepaidUpgrade?: boolean;
    stargiftDropOriginalDetails?: boolean;
    phonegroupMessage?: boolean;
    stargiftAuctionBid?: boolean;
    offer?: boolean;
    id!: string;
    amount!: TypeStarsAmount;
    date!: number;
    peer!: TypeStarsTransactionPeer;
    title?: string;
    description?: string;
    photo?: TypeWebDocument;
    transactionDate?: number;
    transactionUrl?: string;
    botPayload?: Buffer;
    msgId?: MessageIDLike;
    extendedMedia?: TypeMessageMedia[];
    subscriptionPeriod?: number;
    giveawayPostId?: number;
    stargift?: TypeStarGift;
    floodskipNumber?: number;
    starrefCommissionPermille?: number;
    starrefPeer?: TypePeer;
    starrefAmount?: TypeStarsAmount;
    paidMessages?: number;
    premiumGiftMonths?: number;
    adsProceedsFromDate?: number;
    adsProceedsToDate?: number;

    constructor(args: { flags?: number, refund?: boolean, pending?: boolean, failed?: boolean, gift?: boolean, reaction?: boolean, stargiftUpgrade?: boolean, businessTransfer?: boolean, stargiftResale?: boolean, postsSearch?: boolean, stargiftPrepaidUpgrade?: boolean, stargiftDropOriginalDetails?: boolean, phonegroupMessage?: boolean, stargiftAuctionBid?: boolean, offer?: boolean, id?: string, amount?: TypeStarsAmount, date?: number, peer?: TypeStarsTransactionPeer, title?: string, description?: string, photo?: TypeWebDocument, transactionDate?: number, transactionUrl?: string, botPayload?: Buffer, msgId?: MessageIDLike, extendedMedia?: TypeMessageMedia[], subscriptionPeriod?: number, giveawayPostId?: number, stargift?: TypeStarGift, floodskipNumber?: number, starrefCommissionPermille?: number, starrefPeer?: TypePeer, starrefAmount?: TypeStarsAmount, paidMessages?: number, premiumGiftMonths?: number, adsProceedsFromDate?: number, adsProceedsToDate?: number } = {}) {
        super();
        this.flags = args.flags!;
        this.refund = args.refund;
        this.pending = args.pending;
        this.failed = args.failed;
        this.gift = args.gift;
        this.reaction = args.reaction;
        this.stargiftUpgrade = args.stargiftUpgrade;
        this.businessTransfer = args.businessTransfer;
        this.stargiftResale = args.stargiftResale;
        this.postsSearch = args.postsSearch;
        this.stargiftPrepaidUpgrade = args.stargiftPrepaidUpgrade;
        this.stargiftDropOriginalDetails = args.stargiftDropOriginalDetails;
        this.phonegroupMessage = args.phonegroupMessage;
        this.stargiftAuctionBid = args.stargiftAuctionBid;
        this.offer = args.offer;
        this.id = args.id!;
        this.amount = args.amount!;
        this.date = args.date!;
        this.peer = args.peer!;
        this.title = args.title;
        this.description = args.description;
        this.photo = args.photo;
        this.transactionDate = args.transactionDate;
        this.transactionUrl = args.transactionUrl;
        this.botPayload = args.botPayload;
        this.msgId = args.msgId;
        this.extendedMedia = args.extendedMedia;
        this.subscriptionPeriod = args.subscriptionPeriod;
        this.giveawayPostId = args.giveawayPostId;
        this.stargift = args.stargift;
        this.floodskipNumber = args.floodskipNumber;
        this.starrefCommissionPermille = args.starrefCommissionPermille;
        this.starrefPeer = args.starrefPeer;
        this.starrefAmount = args.starrefAmount;
        this.paidMessages = args.paidMessages;
        this.premiumGiftMonths = args.premiumGiftMonths;
        this.adsProceedsFromDate = args.adsProceedsFromDate;
        this.adsProceedsToDate = args.adsProceedsToDate;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(325426864, false);
        let flags = 0;
        if (this.refund) { flags |= 1 << 3; }
        if (this.pending) { flags |= 1 << 4; }
        if (this.failed) { flags |= 1 << 6; }
        if (this.gift) { flags |= 1 << 10; }
        if (this.reaction) { flags |= 1 << 11; }
        if (this.stargiftUpgrade) { flags |= 1 << 18; }
        if (this.businessTransfer) { flags |= 1 << 21; }
        if (this.stargiftResale) { flags |= 1 << 22; }
        if (this.postsSearch) { flags |= 1 << 24; }
        if (this.stargiftPrepaidUpgrade) { flags |= 1 << 25; }
        if (this.stargiftDropOriginalDetails) { flags |= 1 << 26; }
        if (this.phonegroupMessage) { flags |= 1 << 27; }
        if (this.stargiftAuctionBid) { flags |= 1 << 28; }
        if (this.offer) { flags |= 1 << 29; }
        if (this.title !== undefined && this.title !== null) { flags |= 1 << 0; }
        if (this.description !== undefined && this.description !== null) { flags |= 1 << 1; }
        if (this.photo !== undefined && this.photo !== null) { flags |= 1 << 2; }
        if (this.transactionDate !== undefined && this.transactionDate !== null) { flags |= 1 << 5; }
        if (this.transactionUrl !== undefined && this.transactionUrl !== null) { flags |= 1 << 5; }
        if (this.botPayload !== undefined && this.botPayload !== null) { flags |= 1 << 7; }
        if (this.msgId !== undefined && this.msgId !== null) { flags |= 1 << 8; }
        if (this.extendedMedia !== undefined && this.extendedMedia !== null) { flags |= 1 << 9; }
        if (this.subscriptionPeriod !== undefined && this.subscriptionPeriod !== null) { flags |= 1 << 12; }
        if (this.giveawayPostId !== undefined && this.giveawayPostId !== null) { flags |= 1 << 13; }
        if (this.stargift !== undefined && this.stargift !== null) { flags |= 1 << 14; }
        if (this.floodskipNumber !== undefined && this.floodskipNumber !== null) { flags |= 1 << 15; }
        if (this.starrefCommissionPermille !== undefined && this.starrefCommissionPermille !== null) { flags |= 1 << 16; }
        if (this.starrefPeer !== undefined && this.starrefPeer !== null) { flags |= 1 << 17; }
        if (this.starrefAmount !== undefined && this.starrefAmount !== null) { flags |= 1 << 17; }
        if (this.paidMessages !== undefined && this.paidMessages !== null) { flags |= 1 << 19; }
        if (this.premiumGiftMonths !== undefined && this.premiumGiftMonths !== null) { flags |= 1 << 20; }
        if (this.adsProceedsFromDate !== undefined && this.adsProceedsFromDate !== null) { flags |= 1 << 23; }
        if (this.adsProceedsToDate !== undefined && this.adsProceedsToDate !== null) { flags |= 1 << 23; }
        writer.writeInt(flags, false);
        if (this.refund !== undefined && this.refund !== null) {
        }
        if (this.pending !== undefined && this.pending !== null) {
        }
        if (this.failed !== undefined && this.failed !== null) {
        }
        if (this.gift !== undefined && this.gift !== null) {
        }
        if (this.reaction !== undefined && this.reaction !== null) {
        }
        if (this.stargiftUpgrade !== undefined && this.stargiftUpgrade !== null) {
        }
        if (this.businessTransfer !== undefined && this.businessTransfer !== null) {
        }
        if (this.stargiftResale !== undefined && this.stargiftResale !== null) {
        }
        if (this.postsSearch !== undefined && this.postsSearch !== null) {
        }
        if (this.stargiftPrepaidUpgrade !== undefined && this.stargiftPrepaidUpgrade !== null) {
        }
        if (this.stargiftDropOriginalDetails !== undefined && this.stargiftDropOriginalDetails !== null) {
        }
        if (this.phonegroupMessage !== undefined && this.phonegroupMessage !== null) {
        }
        if (this.stargiftAuctionBid !== undefined && this.stargiftAuctionBid !== null) {
        }
        if (this.offer !== undefined && this.offer !== null) {
        }
        writer.tgWriteString(this.id);
        writer.write(this.amount.getBytes());
        writer.writeInt(this.date);
        writer.write(this.peer.getBytes());
        if (this.title !== undefined && this.title !== null) {
            writer.tgWriteString(this.title);
        }
        if (this.description !== undefined && this.description !== null) {
            writer.tgWriteString(this.description);
        }
        if (this.photo !== undefined && this.photo !== null) {
            writer.write(this.photo.getBytes());
        }
        if (this.transactionDate !== undefined && this.transactionDate !== null) {
            writer.writeInt(this.transactionDate);
        }
        if (this.transactionUrl !== undefined && this.transactionUrl !== null) {
            writer.tgWriteString(this.transactionUrl);
        }
        if (this.botPayload !== undefined && this.botPayload !== null) {
            writer.tgWriteBytes(this.botPayload);
        }
        if (this.msgId !== undefined && this.msgId !== null) {
            if (typeof this.msgId === 'number') {
                writer.writeInt(this.msgId);
            } else {
                writer.writeInt((this.msgId as any).id);
            }
        }
        if (this.extendedMedia !== undefined && this.extendedMedia !== null) {
            writer.writeVector(this.extendedMedia, (item) => {
                writer.write(item.getBytes());
            });
        }
        if (this.subscriptionPeriod !== undefined && this.subscriptionPeriod !== null) {
            writer.writeInt(this.subscriptionPeriod);
        }
        if (this.giveawayPostId !== undefined && this.giveawayPostId !== null) {
            writer.writeInt(this.giveawayPostId);
        }
        if (this.stargift !== undefined && this.stargift !== null) {
            writer.write(this.stargift.getBytes());
        }
        if (this.floodskipNumber !== undefined && this.floodskipNumber !== null) {
            writer.writeInt(this.floodskipNumber);
        }
        if (this.starrefCommissionPermille !== undefined && this.starrefCommissionPermille !== null) {
            writer.writeInt(this.starrefCommissionPermille);
        }
        if (this.starrefPeer !== undefined && this.starrefPeer !== null) {
            writer.write(this.starrefPeer.getBytes());
        }
        if (this.starrefAmount !== undefined && this.starrefAmount !== null) {
            writer.write(this.starrefAmount.getBytes());
        }
        if (this.paidMessages !== undefined && this.paidMessages !== null) {
            writer.writeInt(this.paidMessages);
        }
        if (this.premiumGiftMonths !== undefined && this.premiumGiftMonths !== null) {
            writer.writeInt(this.premiumGiftMonths);
        }
        if (this.adsProceedsFromDate !== undefined && this.adsProceedsFromDate !== null) {
            writer.writeInt(this.adsProceedsFromDate);
        }
        if (this.adsProceedsToDate !== undefined && this.adsProceedsToDate !== null) {
            writer.writeInt(this.adsProceedsToDate);
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): StarsTransaction {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 3)) {
            const _refund = true;
            args.refund = _refund;
        } else {
            args.refund = false;
        }
        if (args.flags & (1 << 4)) {
            const _pending = true;
            args.pending = _pending;
        } else {
            args.pending = false;
        }
        if (args.flags & (1 << 6)) {
            const _failed = true;
            args.failed = _failed;
        } else {
            args.failed = false;
        }
        if (args.flags & (1 << 10)) {
            const _gift = true;
            args.gift = _gift;
        } else {
            args.gift = false;
        }
        if (args.flags & (1 << 11)) {
            const _reaction = true;
            args.reaction = _reaction;
        } else {
            args.reaction = false;
        }
        if (args.flags & (1 << 18)) {
            const _stargiftUpgrade = true;
            args.stargiftUpgrade = _stargiftUpgrade;
        } else {
            args.stargiftUpgrade = false;
        }
        if (args.flags & (1 << 21)) {
            const _businessTransfer = true;
            args.businessTransfer = _businessTransfer;
        } else {
            args.businessTransfer = false;
        }
        if (args.flags & (1 << 22)) {
            const _stargiftResale = true;
            args.stargiftResale = _stargiftResale;
        } else {
            args.stargiftResale = false;
        }
        if (args.flags & (1 << 24)) {
            const _postsSearch = true;
            args.postsSearch = _postsSearch;
        } else {
            args.postsSearch = false;
        }
        if (args.flags & (1 << 25)) {
            const _stargiftPrepaidUpgrade = true;
            args.stargiftPrepaidUpgrade = _stargiftPrepaidUpgrade;
        } else {
            args.stargiftPrepaidUpgrade = false;
        }
        if (args.flags & (1 << 26)) {
            const _stargiftDropOriginalDetails = true;
            args.stargiftDropOriginalDetails = _stargiftDropOriginalDetails;
        } else {
            args.stargiftDropOriginalDetails = false;
        }
        if (args.flags & (1 << 27)) {
            const _phonegroupMessage = true;
            args.phonegroupMessage = _phonegroupMessage;
        } else {
            args.phonegroupMessage = false;
        }
        if (args.flags & (1 << 28)) {
            const _stargiftAuctionBid = true;
            args.stargiftAuctionBid = _stargiftAuctionBid;
        } else {
            args.stargiftAuctionBid = false;
        }
        if (args.flags & (1 << 29)) {
            const _offer = true;
            args.offer = _offer;
        } else {
            args.offer = false;
        }
        const _id = reader.tgReadString();
        args.id = _id;
        const _amount = reader.tgReadObject();
        args.amount = _amount;
        const _date = reader.readInt();
        args.date = _date;
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        if (args.flags & (1 << 0)) {
            const _title = reader.tgReadString();
            args.title = _title;
        } else {
            args.title = undefined;
        }
        if (args.flags & (1 << 1)) {
            const _description = reader.tgReadString();
            args.description = _description;
        } else {
            args.description = undefined;
        }
        if (args.flags & (1 << 2)) {
            const _photo = reader.tgReadObject();
            args.photo = _photo;
        } else {
            args.photo = undefined;
        }
        if (args.flags & (1 << 5)) {
            const _transactionDate = reader.readInt();
            args.transactionDate = _transactionDate;
        } else {
            args.transactionDate = undefined;
        }
        if (args.flags & (1 << 5)) {
            const _transactionUrl = reader.tgReadString();
            args.transactionUrl = _transactionUrl;
        } else {
            args.transactionUrl = undefined;
        }
        if (args.flags & (1 << 7)) {
            const _botPayload = reader.tgReadBytes();
            args.botPayload = _botPayload;
        } else {
            args.botPayload = undefined;
        }
        if (args.flags & (1 << 8)) {
            const _msgId = reader.tgReadObject();
            args.msgId = _msgId;
        } else {
            args.msgId = undefined;
        }
        if (args.flags & (1 << 9)) {
            const _extendedMedia = reader.readVector((reader) => {
                const item = reader.tgReadObject();
                return item;
            });
            args.extendedMedia = _extendedMedia;
        } else {
            args.extendedMedia = undefined;
        }
        if (args.flags & (1 << 12)) {
            const _subscriptionPeriod = reader.readInt();
            args.subscriptionPeriod = _subscriptionPeriod;
        } else {
            args.subscriptionPeriod = undefined;
        }
        if (args.flags & (1 << 13)) {
            const _giveawayPostId = reader.readInt();
            args.giveawayPostId = _giveawayPostId;
        } else {
            args.giveawayPostId = undefined;
        }
        if (args.flags & (1 << 14)) {
            const _stargift = reader.tgReadObject();
            args.stargift = _stargift;
        } else {
            args.stargift = undefined;
        }
        if (args.flags & (1 << 15)) {
            const _floodskipNumber = reader.readInt();
            args.floodskipNumber = _floodskipNumber;
        } else {
            args.floodskipNumber = undefined;
        }
        if (args.flags & (1 << 16)) {
            const _starrefCommissionPermille = reader.readInt();
            args.starrefCommissionPermille = _starrefCommissionPermille;
        } else {
            args.starrefCommissionPermille = undefined;
        }
        if (args.flags & (1 << 17)) {
            const _starrefPeer = reader.tgReadObject();
            args.starrefPeer = _starrefPeer;
        } else {
            args.starrefPeer = undefined;
        }
        if (args.flags & (1 << 17)) {
            const _starrefAmount = reader.tgReadObject();
            args.starrefAmount = _starrefAmount;
        } else {
            args.starrefAmount = undefined;
        }
        if (args.flags & (1 << 19)) {
            const _paidMessages = reader.readInt();
            args.paidMessages = _paidMessages;
        } else {
            args.paidMessages = undefined;
        }
        if (args.flags & (1 << 20)) {
            const _premiumGiftMonths = reader.readInt();
            args.premiumGiftMonths = _premiumGiftMonths;
        } else {
            args.premiumGiftMonths = undefined;
        }
        if (args.flags & (1 << 23)) {
            const _adsProceedsFromDate = reader.readInt();
            args.adsProceedsFromDate = _adsProceedsFromDate;
        } else {
            args.adsProceedsFromDate = undefined;
        }
        if (args.flags & (1 << 23)) {
            const _adsProceedsToDate = reader.readInt();
            args.adsProceedsToDate = _adsProceedsToDate;
        } else {
            args.adsProceedsToDate = undefined;
        }
        return new StarsTransaction(args);
    }
}