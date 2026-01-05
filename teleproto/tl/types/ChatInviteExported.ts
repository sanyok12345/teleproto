import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeStarsSubscriptionPricing } from "./TypeStarsSubscriptionPricing";

export class ChatInviteExported extends TLObject {
    static CONSTRUCTOR_ID = 2720841110;
    static SUBCLASS_OF_ID = 3027536472;
    static className = "ChatInviteExported";
    static classType = "constructor";

    flags!: number;
    revoked?: boolean;
    permanent?: boolean;
    requestNeeded?: boolean;
    link!: string;
    adminId!: bigint;
    date!: number;
    startDate?: number;
    expireDate?: number;
    usageLimit?: number;
    usage?: number;
    requested?: number;
    subscriptionExpired?: number;
    title?: string;
    subscriptionPricing?: TypeStarsSubscriptionPricing;

    constructor(args: { flags?: number, revoked?: boolean, permanent?: boolean, requestNeeded?: boolean, link?: string, adminId?: bigint, date?: number, startDate?: number, expireDate?: number, usageLimit?: number, usage?: number, requested?: number, subscriptionExpired?: number, title?: string, subscriptionPricing?: TypeStarsSubscriptionPricing } = {}) {
        super();
        this.flags = args.flags!;
        this.revoked = args.revoked;
        this.permanent = args.permanent;
        this.requestNeeded = args.requestNeeded;
        this.link = args.link!;
        this.adminId = args.adminId!;
        this.date = args.date!;
        this.startDate = args.startDate;
        this.expireDate = args.expireDate;
        this.usageLimit = args.usageLimit;
        this.usage = args.usage;
        this.requested = args.requested;
        this.subscriptionExpired = args.subscriptionExpired;
        this.title = args.title;
        this.subscriptionPricing = args.subscriptionPricing;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2720841110, false);
        let flags = 0;
        if (this.revoked) { flags |= 1 << 0; }
        if (this.permanent) { flags |= 1 << 5; }
        if (this.requestNeeded) { flags |= 1 << 6; }
        if (this.startDate !== undefined && this.startDate !== null) { flags |= 1 << 4; }
        if (this.expireDate !== undefined && this.expireDate !== null) { flags |= 1 << 1; }
        if (this.usageLimit !== undefined && this.usageLimit !== null) { flags |= 1 << 2; }
        if (this.usage !== undefined && this.usage !== null) { flags |= 1 << 3; }
        if (this.requested !== undefined && this.requested !== null) { flags |= 1 << 7; }
        if (this.subscriptionExpired !== undefined && this.subscriptionExpired !== null) { flags |= 1 << 10; }
        if (this.title !== undefined && this.title !== null) { flags |= 1 << 8; }
        if (this.subscriptionPricing !== undefined && this.subscriptionPricing !== null) { flags |= 1 << 9; }
        writer.writeInt(flags, false);
        if (this.revoked !== undefined && this.revoked !== null) {
        }
        if (this.permanent !== undefined && this.permanent !== null) {
        }
        if (this.requestNeeded !== undefined && this.requestNeeded !== null) {
        }
        writer.tgWriteString(this.link);
        writer.writeLargeInt(this.adminId, 64);
        writer.writeInt(this.date);
        if (this.startDate !== undefined && this.startDate !== null) {
            writer.writeInt(this.startDate);
        }
        if (this.expireDate !== undefined && this.expireDate !== null) {
            writer.writeInt(this.expireDate);
        }
        if (this.usageLimit !== undefined && this.usageLimit !== null) {
            writer.writeInt(this.usageLimit);
        }
        if (this.usage !== undefined && this.usage !== null) {
            writer.writeInt(this.usage);
        }
        if (this.requested !== undefined && this.requested !== null) {
            writer.writeInt(this.requested);
        }
        if (this.subscriptionExpired !== undefined && this.subscriptionExpired !== null) {
            writer.writeInt(this.subscriptionExpired);
        }
        if (this.title !== undefined && this.title !== null) {
            writer.tgWriteString(this.title);
        }
        if (this.subscriptionPricing !== undefined && this.subscriptionPricing !== null) {
            writer.write(this.subscriptionPricing.getBytes());
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): ChatInviteExported {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _revoked = true;
            args.revoked = _revoked;
        } else {
            args.revoked = false;
        }
        if (args.flags & (1 << 5)) {
            const _permanent = true;
            args.permanent = _permanent;
        } else {
            args.permanent = false;
        }
        if (args.flags & (1 << 6)) {
            const _requestNeeded = true;
            args.requestNeeded = _requestNeeded;
        } else {
            args.requestNeeded = false;
        }
        const _link = reader.tgReadString();
        args.link = _link;
        const _adminId = reader.readLargeInt(64);
        args.adminId = _adminId;
        const _date = reader.readInt();
        args.date = _date;
        if (args.flags & (1 << 4)) {
            const _startDate = reader.readInt();
            args.startDate = _startDate;
        } else {
            args.startDate = undefined;
        }
        if (args.flags & (1 << 1)) {
            const _expireDate = reader.readInt();
            args.expireDate = _expireDate;
        } else {
            args.expireDate = undefined;
        }
        if (args.flags & (1 << 2)) {
            const _usageLimit = reader.readInt();
            args.usageLimit = _usageLimit;
        } else {
            args.usageLimit = undefined;
        }
        if (args.flags & (1 << 3)) {
            const _usage = reader.readInt();
            args.usage = _usage;
        } else {
            args.usage = undefined;
        }
        if (args.flags & (1 << 7)) {
            const _requested = reader.readInt();
            args.requested = _requested;
        } else {
            args.requested = undefined;
        }
        if (args.flags & (1 << 10)) {
            const _subscriptionExpired = reader.readInt();
            args.subscriptionExpired = _subscriptionExpired;
        } else {
            args.subscriptionExpired = undefined;
        }
        if (args.flags & (1 << 8)) {
            const _title = reader.tgReadString();
            args.title = _title;
        } else {
            args.title = undefined;
        }
        if (args.flags & (1 << 9)) {
            const _subscriptionPricing = reader.tgReadObject();
            args.subscriptionPricing = _subscriptionPricing;
        } else {
            args.subscriptionPricing = undefined;
        }
        return new ChatInviteExported(args);
    }
}