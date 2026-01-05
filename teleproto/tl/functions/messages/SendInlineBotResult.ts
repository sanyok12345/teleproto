import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { TypeInputReplyTo } from "../../types/TypeInputReplyTo";
import { TypeInputQuickReplyShortcut } from "../../types/TypeInputQuickReplyShortcut";
import { TypeUpdates } from "../../types/TypeUpdates";

export class SendInlineBotResult extends MTProtoRequest {
    static CONSTRUCTOR_ID = 3234821702;
    static SUBCLASS_OF_ID = 2331323052;
    static className = "messages.SendInlineBotResult";
    static classType = "request";

    flags?: number;
    silent?: boolean;
    background?: boolean;
    clearDraft?: boolean;
    hideVia?: boolean;
    peer?: EntityLike;
    replyTo?: TypeInputReplyTo;
    randomId!: bigint;
    queryId?: bigint;
    id?: string;
    scheduleDate?: number;
    sendAs?: EntityLike;
    quickReplyShortcut?: TypeInputQuickReplyShortcut;
    allowPaidStars?: bigint;

    constructor(args: { flags?: number, silent?: boolean, background?: boolean, clearDraft?: boolean, hideVia?: boolean, peer?: EntityLike, replyTo?: TypeInputReplyTo, randomId?: bigint, queryId?: bigint, id?: string, scheduleDate?: number, sendAs?: EntityLike, quickReplyShortcut?: TypeInputQuickReplyShortcut, allowPaidStars?: bigint } = {}) {
        super();
        this.flags = args.flags;
        this.silent = args.silent;
        this.background = args.background;
        this.clearDraft = args.clearDraft;
        this.hideVia = args.hideVia;
        this.peer = args.peer;
        this.replyTo = args.replyTo;
        this.randomId = args.randomId!;
        this.queryId = args.queryId;
        this.id = args.id;
        this.scheduleDate = args.scheduleDate;
        this.sendAs = args.sendAs;
        this.quickReplyShortcut = args.quickReplyShortcut;
        this.allowPaidStars = args.allowPaidStars;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3234821702, false);
        let flags = 0;
        if (this.silent) { flags |= 1 << 5; }
        if (this.background) { flags |= 1 << 6; }
        if (this.clearDraft) { flags |= 1 << 7; }
        if (this.hideVia) { flags |= 1 << 11; }
        if (this.replyTo !== undefined && this.replyTo !== null) { flags |= 1 << 0; }
        if (this.scheduleDate !== undefined && this.scheduleDate !== null) { flags |= 1 << 10; }
        if (this.sendAs !== undefined && this.sendAs !== null) { flags |= 1 << 13; }
        if (this.quickReplyShortcut !== undefined && this.quickReplyShortcut !== null) { flags |= 1 << 17; }
        if (this.allowPaidStars !== undefined && this.allowPaidStars !== null) { flags |= 1 << 21; }
        writer.writeInt(flags, false);
        if (this.silent !== undefined && this.silent !== null) {
        }
        if (this.background !== undefined && this.background !== null) {
        }
        if (this.clearDraft !== undefined && this.clearDraft !== null) {
        }
        if (this.hideVia !== undefined && this.hideVia !== null) {
        }
        writer.write((this.peer! as any).getBytes());
        if (this.replyTo !== undefined && this.replyTo !== null) {
            writer.write(this.replyTo.getBytes());
        }
        writer.writeLargeInt(this.randomId, 64);
        writer.writeLargeInt(this.queryId!, 64);
        writer.tgWriteString(this.id!);
        if (this.scheduleDate !== undefined && this.scheduleDate !== null) {
            writer.writeInt(this.scheduleDate);
        }
        if (this.sendAs !== undefined && this.sendAs !== null) {
            writer.write((this.sendAs as any).getBytes());
        }
        if (this.quickReplyShortcut !== undefined && this.quickReplyShortcut !== null) {
            writer.write(this.quickReplyShortcut.getBytes());
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

    static fromReader(reader: BinaryReader): SendInlineBotResult {
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
        if (args.flags & (1 << 11)) {
            const _hideVia = true;
            args.hideVia = _hideVia;
        } else {
            args.hideVia = false;
        }
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        if (args.flags & (1 << 0)) {
            const _replyTo = reader.tgReadObject();
            args.replyTo = _replyTo;
        } else {
            args.replyTo = undefined;
        }
        const _randomId = reader.readLargeInt(64);
        args.randomId = _randomId;
        const _queryId = reader.readLargeInt(64);
        args.queryId = _queryId;
        const _id = reader.tgReadString();
        args.id = _id;
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
        if (args.flags & (1 << 21)) {
            const _allowPaidStars = reader.readLargeInt(64);
            args.allowPaidStars = _allowPaidStars;
        } else {
            args.allowPaidStars = undefined;
        }
        return new SendInlineBotResult(args);
    }
}