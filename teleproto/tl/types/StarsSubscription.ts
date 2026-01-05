import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypePeer } from "./TypePeer";
import { TypeStarsSubscriptionPricing } from "./TypeStarsSubscriptionPricing";
import { TypeWebDocument } from "./TypeWebDocument";

export class StarsSubscription extends TLObject {
    static CONSTRUCTOR_ID = 779004698;
    static SUBCLASS_OF_ID = 3974965699;
    static className = "StarsSubscription";
    static classType = "constructor";

    flags!: number;
    canceled?: boolean;
    canRefulfill?: boolean;
    missingBalance?: boolean;
    botCanceled?: boolean;
    id!: string;
    peer!: TypePeer;
    untilDate!: number;
    pricing!: TypeStarsSubscriptionPricing;
    chatInviteHash?: string;
    title?: string;
    photo?: TypeWebDocument;
    invoiceSlug?: string;

    constructor(args: { flags?: number, canceled?: boolean, canRefulfill?: boolean, missingBalance?: boolean, botCanceled?: boolean, id?: string, peer?: TypePeer, untilDate?: number, pricing?: TypeStarsSubscriptionPricing, chatInviteHash?: string, title?: string, photo?: TypeWebDocument, invoiceSlug?: string } = {}) {
        super();
        this.flags = args.flags!;
        this.canceled = args.canceled;
        this.canRefulfill = args.canRefulfill;
        this.missingBalance = args.missingBalance;
        this.botCanceled = args.botCanceled;
        this.id = args.id!;
        this.peer = args.peer!;
        this.untilDate = args.untilDate!;
        this.pricing = args.pricing!;
        this.chatInviteHash = args.chatInviteHash;
        this.title = args.title;
        this.photo = args.photo;
        this.invoiceSlug = args.invoiceSlug;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(779004698, false);
        let flags = 0;
        if (this.canceled) { flags |= 1 << 0; }
        if (this.canRefulfill) { flags |= 1 << 1; }
        if (this.missingBalance) { flags |= 1 << 2; }
        if (this.botCanceled) { flags |= 1 << 7; }
        if (this.chatInviteHash !== undefined && this.chatInviteHash !== null) { flags |= 1 << 3; }
        if (this.title !== undefined && this.title !== null) { flags |= 1 << 4; }
        if (this.photo !== undefined && this.photo !== null) { flags |= 1 << 5; }
        if (this.invoiceSlug !== undefined && this.invoiceSlug !== null) { flags |= 1 << 6; }
        writer.writeInt(flags, false);
        if (this.canceled !== undefined && this.canceled !== null) {
        }
        if (this.canRefulfill !== undefined && this.canRefulfill !== null) {
        }
        if (this.missingBalance !== undefined && this.missingBalance !== null) {
        }
        if (this.botCanceled !== undefined && this.botCanceled !== null) {
        }
        writer.tgWriteString(this.id);
        writer.write(this.peer.getBytes());
        writer.writeInt(this.untilDate);
        writer.write(this.pricing.getBytes());
        if (this.chatInviteHash !== undefined && this.chatInviteHash !== null) {
            writer.tgWriteString(this.chatInviteHash);
        }
        if (this.title !== undefined && this.title !== null) {
            writer.tgWriteString(this.title);
        }
        if (this.photo !== undefined && this.photo !== null) {
            writer.write(this.photo.getBytes());
        }
        if (this.invoiceSlug !== undefined && this.invoiceSlug !== null) {
            writer.tgWriteString(this.invoiceSlug);
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): StarsSubscription {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _canceled = true;
            args.canceled = _canceled;
        } else {
            args.canceled = false;
        }
        if (args.flags & (1 << 1)) {
            const _canRefulfill = true;
            args.canRefulfill = _canRefulfill;
        } else {
            args.canRefulfill = false;
        }
        if (args.flags & (1 << 2)) {
            const _missingBalance = true;
            args.missingBalance = _missingBalance;
        } else {
            args.missingBalance = false;
        }
        if (args.flags & (1 << 7)) {
            const _botCanceled = true;
            args.botCanceled = _botCanceled;
        } else {
            args.botCanceled = false;
        }
        const _id = reader.tgReadString();
        args.id = _id;
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        const _untilDate = reader.readInt();
        args.untilDate = _untilDate;
        const _pricing = reader.tgReadObject();
        args.pricing = _pricing;
        if (args.flags & (1 << 3)) {
            const _chatInviteHash = reader.tgReadString();
            args.chatInviteHash = _chatInviteHash;
        } else {
            args.chatInviteHash = undefined;
        }
        if (args.flags & (1 << 4)) {
            const _title = reader.tgReadString();
            args.title = _title;
        } else {
            args.title = undefined;
        }
        if (args.flags & (1 << 5)) {
            const _photo = reader.tgReadObject();
            args.photo = _photo;
        } else {
            args.photo = undefined;
        }
        if (args.flags & (1 << 6)) {
            const _invoiceSlug = reader.tgReadString();
            args.invoiceSlug = _invoiceSlug;
        } else {
            args.invoiceSlug = undefined;
        }
        return new StarsSubscription(args);
    }
}