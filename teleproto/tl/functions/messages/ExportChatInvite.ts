import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { TypeStarsSubscriptionPricing } from "../../types/TypeStarsSubscriptionPricing";
import { TypeExportedChatInvite } from "../../types/TypeExportedChatInvite";

export class ExportChatInvite extends MTProtoRequest {
    static CONSTRUCTOR_ID = 2757090960;
    static SUBCLASS_OF_ID = 3027536472;
    static className = "messages.ExportChatInvite";
    static classType = "request";

    flags?: number;
    legacyRevokePermanent?: boolean;
    requestNeeded?: boolean;
    peer?: EntityLike;
    expireDate?: number;
    usageLimit?: number;
    title?: string;
    subscriptionPricing?: TypeStarsSubscriptionPricing;

    constructor(args: { flags?: number, legacyRevokePermanent?: boolean, requestNeeded?: boolean, peer?: EntityLike, expireDate?: number, usageLimit?: number, title?: string, subscriptionPricing?: TypeStarsSubscriptionPricing } = {}) {
        super();
        this.flags = args.flags;
        this.legacyRevokePermanent = args.legacyRevokePermanent;
        this.requestNeeded = args.requestNeeded;
        this.peer = args.peer;
        this.expireDate = args.expireDate;
        this.usageLimit = args.usageLimit;
        this.title = args.title;
        this.subscriptionPricing = args.subscriptionPricing;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2757090960, false);
        let flags = 0;
        if (this.legacyRevokePermanent) { flags |= 1 << 2; }
        if (this.requestNeeded) { flags |= 1 << 3; }
        if (this.expireDate !== undefined && this.expireDate !== null) { flags |= 1 << 0; }
        if (this.usageLimit !== undefined && this.usageLimit !== null) { flags |= 1 << 1; }
        if (this.title !== undefined && this.title !== null) { flags |= 1 << 4; }
        if (this.subscriptionPricing !== undefined && this.subscriptionPricing !== null) { flags |= 1 << 5; }
        writer.writeInt(flags, false);
        if (this.legacyRevokePermanent !== undefined && this.legacyRevokePermanent !== null) {
        }
        if (this.requestNeeded !== undefined && this.requestNeeded !== null) {
        }
        writer.write((this.peer! as any).getBytes());
        if (this.expireDate !== undefined && this.expireDate !== null) {
            writer.writeInt(this.expireDate);
        }
        if (this.usageLimit !== undefined && this.usageLimit !== null) {
            writer.writeInt(this.usageLimit);
        }
        if (this.title !== undefined && this.title !== null) {
            writer.tgWriteString(this.title);
        }
        if (this.subscriptionPricing !== undefined && this.subscriptionPricing !== null) {
            writer.write(this.subscriptionPricing.getBytes());
        }
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeExportedChatInvite {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): ExportChatInvite {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 2)) {
            const _legacyRevokePermanent = true;
            args.legacyRevokePermanent = _legacyRevokePermanent;
        } else {
            args.legacyRevokePermanent = false;
        }
        if (args.flags & (1 << 3)) {
            const _requestNeeded = true;
            args.requestNeeded = _requestNeeded;
        } else {
            args.requestNeeded = false;
        }
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        if (args.flags & (1 << 0)) {
            const _expireDate = reader.readInt();
            args.expireDate = _expireDate;
        } else {
            args.expireDate = undefined;
        }
        if (args.flags & (1 << 1)) {
            const _usageLimit = reader.readInt();
            args.usageLimit = _usageLimit;
        } else {
            args.usageLimit = undefined;
        }
        if (args.flags & (1 << 4)) {
            const _title = reader.tgReadString();
            args.title = _title;
        } else {
            args.title = undefined;
        }
        if (args.flags & (1 << 5)) {
            const _subscriptionPricing = reader.tgReadObject();
            args.subscriptionPricing = _subscriptionPricing;
        } else {
            args.subscriptionPricing = undefined;
        }
        return new ExportChatInvite(args);
    }
}