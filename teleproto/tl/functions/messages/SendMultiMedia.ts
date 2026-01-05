import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { TypeInputReplyTo } from "../../types/TypeInputReplyTo";
import { TypeInputSingleMedia } from "../../types/TypeInputSingleMedia";
import { TypeInputQuickReplyShortcut } from "../../types/TypeInputQuickReplyShortcut";
import { TypeUpdates } from "../../types/TypeUpdates";

export class SendMultiMedia extends MTProtoRequest {
    static CONSTRUCTOR_ID = 469278068;
    static SUBCLASS_OF_ID = 2331323052;
    static className = "messages.SendMultiMedia";
    static classType = "request";

    flags?: number;
    silent?: boolean;
    background?: boolean;
    clearDraft?: boolean;
    noforwards?: boolean;
    updateStickersetsOrder?: boolean;
    invertMedia?: boolean;
    allowPaidFloodskip?: boolean;
    peer?: EntityLike;
    replyTo?: TypeInputReplyTo;
    multiMedia!: TypeInputSingleMedia[];
    scheduleDate?: number;
    sendAs?: EntityLike;
    quickReplyShortcut?: TypeInputQuickReplyShortcut;
    effect?: bigint;
    allowPaidStars?: bigint;

    constructor(args: { flags?: number, silent?: boolean, background?: boolean, clearDraft?: boolean, noforwards?: boolean, updateStickersetsOrder?: boolean, invertMedia?: boolean, allowPaidFloodskip?: boolean, peer?: EntityLike, replyTo?: TypeInputReplyTo, multiMedia?: TypeInputSingleMedia[], scheduleDate?: number, sendAs?: EntityLike, quickReplyShortcut?: TypeInputQuickReplyShortcut, effect?: bigint, allowPaidStars?: bigint } = {}) {
        super();
        this.flags = args.flags;
        this.silent = args.silent;
        this.background = args.background;
        this.clearDraft = args.clearDraft;
        this.noforwards = args.noforwards;
        this.updateStickersetsOrder = args.updateStickersetsOrder;
        this.invertMedia = args.invertMedia;
        this.allowPaidFloodskip = args.allowPaidFloodskip;
        this.peer = args.peer;
        this.replyTo = args.replyTo;
        this.multiMedia = args.multiMedia!;
        this.scheduleDate = args.scheduleDate;
        this.sendAs = args.sendAs;
        this.quickReplyShortcut = args.quickReplyShortcut;
        this.effect = args.effect;
        this.allowPaidStars = args.allowPaidStars;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(469278068, false);
        let flags = 0;
        if (this.silent) { flags |= 1 << 5; }
        if (this.background) { flags |= 1 << 6; }
        if (this.clearDraft) { flags |= 1 << 7; }
        if (this.noforwards) { flags |= 1 << 14; }
        if (this.updateStickersetsOrder) { flags |= 1 << 15; }
        if (this.invertMedia) { flags |= 1 << 16; }
        if (this.allowPaidFloodskip) { flags |= 1 << 19; }
        if (this.replyTo !== undefined && this.replyTo !== null) { flags |= 1 << 0; }
        if (this.scheduleDate !== undefined && this.scheduleDate !== null) { flags |= 1 << 10; }
        if (this.sendAs !== undefined && this.sendAs !== null) { flags |= 1 << 13; }
        if (this.quickReplyShortcut !== undefined && this.quickReplyShortcut !== null) { flags |= 1 << 17; }
        if (this.effect !== undefined && this.effect !== null) { flags |= 1 << 18; }
        if (this.allowPaidStars !== undefined && this.allowPaidStars !== null) { flags |= 1 << 21; }
        writer.writeInt(flags, false);
        if (this.silent !== undefined && this.silent !== null) {
        }
        if (this.background !== undefined && this.background !== null) {
        }
        if (this.clearDraft !== undefined && this.clearDraft !== null) {
        }
        if (this.noforwards !== undefined && this.noforwards !== null) {
        }
        if (this.updateStickersetsOrder !== undefined && this.updateStickersetsOrder !== null) {
        }
        if (this.invertMedia !== undefined && this.invertMedia !== null) {
        }
        if (this.allowPaidFloodskip !== undefined && this.allowPaidFloodskip !== null) {
        }
        writer.write((this.peer! as any).getBytes());
        if (this.replyTo !== undefined && this.replyTo !== null) {
            writer.write(this.replyTo.getBytes());
        }
        writer.writeVector(this.multiMedia, (item) => {
            writer.write(item.getBytes());
        });
        if (this.scheduleDate !== undefined && this.scheduleDate !== null) {
            writer.writeInt(this.scheduleDate);
        }
        if (this.sendAs !== undefined && this.sendAs !== null) {
            writer.write((this.sendAs as any).getBytes());
        }
        if (this.quickReplyShortcut !== undefined && this.quickReplyShortcut !== null) {
            writer.write(this.quickReplyShortcut.getBytes());
        }
        if (this.effect !== undefined && this.effect !== null) {
            writer.writeLargeInt(this.effect, 64);
        }
        if (this.allowPaidStars !== undefined && this.allowPaidStars !== null) {
            writer.writeLargeInt(this.allowPaidStars, 64);
        }
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeUpdates {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): SendMultiMedia {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 5)) {
            const _silent = true;
            args.silent = _silent;
        } else {
            args.silent = false;
        }
        if (args.flags & (1 << 6)) {
            const _background = true;
            args.background = _background;
        } else {
            args.background = false;
        }
        if (args.flags & (1 << 7)) {
            const _clearDraft = true;
            args.clearDraft = _clearDraft;
        } else {
            args.clearDraft = false;
        }
        if (args.flags & (1 << 14)) {
            const _noforwards = true;
            args.noforwards = _noforwards;
        } else {
            args.noforwards = false;
        }
        if (args.flags & (1 << 15)) {
            const _updateStickersetsOrder = true;
            args.updateStickersetsOrder = _updateStickersetsOrder;
        } else {
            args.updateStickersetsOrder = false;
        }
        if (args.flags & (1 << 16)) {
            const _invertMedia = true;
            args.invertMedia = _invertMedia;
        } else {
            args.invertMedia = false;
        }
        if (args.flags & (1 << 19)) {
            const _allowPaidFloodskip = true;
            args.allowPaidFloodskip = _allowPaidFloodskip;
        } else {
            args.allowPaidFloodskip = false;
        }
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        if (args.flags & (1 << 0)) {
            const _replyTo = reader.tgReadObject();
            args.replyTo = _replyTo;
        } else {
            args.replyTo = undefined;
        }
        const _multiMedia = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.multiMedia = _multiMedia;
        if (args.flags & (1 << 10)) {
            const _scheduleDate = reader.readInt();
            args.scheduleDate = _scheduleDate;
        } else {
            args.scheduleDate = undefined;
        }
        if (args.flags & (1 << 13)) {
            const _sendAs = reader.tgReadObject();
            args.sendAs = _sendAs;
        } else {
            args.sendAs = undefined;
        }
        if (args.flags & (1 << 17)) {
            const _quickReplyShortcut = reader.tgReadObject();
            args.quickReplyShortcut = _quickReplyShortcut;
        } else {
            args.quickReplyShortcut = undefined;
        }
        if (args.flags & (1 << 18)) {
            const _effect = reader.readLargeInt(64);
            args.effect = _effect;
        } else {
            args.effect = undefined;
        }
        if (args.flags & (1 << 21)) {
            const _allowPaidStars = reader.readLargeInt(64);
            args.allowPaidStars = _allowPaidStars;
        } else {
            args.allowPaidStars = undefined;
        }
        return new SendMultiMedia(args);
    }
}