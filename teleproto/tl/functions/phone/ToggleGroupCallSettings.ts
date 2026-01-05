import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeInputGroupCall } from "../../types/TypeInputGroupCall";
import { TypeUpdates } from "../../types/TypeUpdates";

export class ToggleGroupCallSettings extends MTProtoRequest {
    static CONSTRUCTOR_ID = 2537788146;
    static SUBCLASS_OF_ID = 2331323052;
    static className = "phone.ToggleGroupCallSettings";
    static classType = "request";

    flags?: number;
    resetInviteHash?: boolean;
    call!: TypeInputGroupCall;
    joinMuted?: boolean;
    messagesEnabled?: boolean;
    sendPaidMessagesStars?: bigint;

    constructor(args: { flags?: number, resetInviteHash?: boolean, call?: TypeInputGroupCall, joinMuted?: boolean, messagesEnabled?: boolean, sendPaidMessagesStars?: bigint } = {}) {
        super();
        this.flags = args.flags;
        this.resetInviteHash = args.resetInviteHash;
        this.call = args.call!;
        this.joinMuted = args.joinMuted;
        this.messagesEnabled = args.messagesEnabled;
        this.sendPaidMessagesStars = args.sendPaidMessagesStars;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2537788146, false);
        let flags = 0;
        if (this.resetInviteHash) { flags |= 1 << 1; }
        if (this.joinMuted !== undefined && this.joinMuted !== null) { flags |= 1 << 0; }
        if (this.messagesEnabled !== undefined && this.messagesEnabled !== null) { flags |= 1 << 2; }
        if (this.sendPaidMessagesStars !== undefined && this.sendPaidMessagesStars !== null) { flags |= 1 << 3; }
        writer.writeInt(flags, false);
        if (this.resetInviteHash !== undefined && this.resetInviteHash !== null) {
        }
        writer.write(this.call.getBytes());
        if (this.joinMuted !== undefined && this.joinMuted !== null) {
            writer.tgWriteBool(this.joinMuted);
        }
        if (this.messagesEnabled !== undefined && this.messagesEnabled !== null) {
            writer.tgWriteBool(this.messagesEnabled);
        }
        if (this.sendPaidMessagesStars !== undefined && this.sendPaidMessagesStars !== null) {
            writer.writeLargeInt(this.sendPaidMessagesStars, 64);
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

    static fromReader(reader: BinaryReader): ToggleGroupCallSettings {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 1)) {
            const _resetInviteHash = true;
            args.resetInviteHash = _resetInviteHash;
        } else {
            args.resetInviteHash = false;
        }
        const _call = reader.tgReadObject();
        args.call = _call;
        if (args.flags & (1 << 0)) {
            const _joinMuted = reader.tgReadBool();
            args.joinMuted = _joinMuted;
        } else {
            args.joinMuted = undefined;
        }
        if (args.flags & (1 << 2)) {
            const _messagesEnabled = reader.tgReadBool();
            args.messagesEnabled = _messagesEnabled;
        } else {
            args.messagesEnabled = undefined;
        }
        if (args.flags & (1 << 3)) {
            const _sendPaidMessagesStars = reader.readLargeInt(64);
            args.sendPaidMessagesStars = _sendPaidMessagesStars;
        } else {
            args.sendPaidMessagesStars = undefined;
        }
        return new ToggleGroupCallSettings(args);
    }
}