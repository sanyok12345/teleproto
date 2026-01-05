import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { TypeMessageEntity } from "../../types/TypeMessageEntity";
import { TypeInputPrivacyRule } from "../../types/TypeInputPrivacyRule";
import { TypeUpdates } from "../../types/TypeUpdates";

export class StartLive extends MTProtoRequest {
    static CONSTRUCTOR_ID = 3496594654;
    static SUBCLASS_OF_ID = 2331323052;
    static className = "stories.StartLive";
    static classType = "request";

    flags?: number;
    pinned?: boolean;
    noforwards?: boolean;
    rtmpStream?: boolean;
    peer?: EntityLike;
    caption?: string;
    entities?: TypeMessageEntity[];
    privacyRules!: TypeInputPrivacyRule[];
    randomId!: bigint;
    messagesEnabled?: boolean;
    sendPaidMessagesStars?: bigint;

    constructor(args: { flags?: number, pinned?: boolean, noforwards?: boolean, rtmpStream?: boolean, peer?: EntityLike, caption?: string, entities?: TypeMessageEntity[], privacyRules?: TypeInputPrivacyRule[], randomId?: bigint, messagesEnabled?: boolean, sendPaidMessagesStars?: bigint } = {}) {
        super();
        this.flags = args.flags;
        this.pinned = args.pinned;
        this.noforwards = args.noforwards;
        this.rtmpStream = args.rtmpStream;
        this.peer = args.peer;
        this.caption = args.caption;
        this.entities = args.entities;
        this.privacyRules = args.privacyRules!;
        this.randomId = args.randomId!;
        this.messagesEnabled = args.messagesEnabled;
        this.sendPaidMessagesStars = args.sendPaidMessagesStars;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3496594654, false);
        let flags = 0;
        if (this.pinned) { flags |= 1 << 2; }
        if (this.noforwards) { flags |= 1 << 4; }
        if (this.rtmpStream) { flags |= 1 << 5; }
        if (this.caption !== undefined && this.caption !== null) { flags |= 1 << 0; }
        if (this.entities !== undefined && this.entities !== null) { flags |= 1 << 1; }
        if (this.messagesEnabled !== undefined && this.messagesEnabled !== null) { flags |= 1 << 6; }
        if (this.sendPaidMessagesStars !== undefined && this.sendPaidMessagesStars !== null) { flags |= 1 << 7; }
        writer.writeInt(flags, false);
        if (this.pinned !== undefined && this.pinned !== null) {
        }
        if (this.noforwards !== undefined && this.noforwards !== null) {
        }
        if (this.rtmpStream !== undefined && this.rtmpStream !== null) {
        }
        writer.write((this.peer! as any).getBytes());
        if (this.caption !== undefined && this.caption !== null) {
            writer.tgWriteString(this.caption);
        }
        if (this.entities !== undefined && this.entities !== null) {
            writer.writeVector(this.entities, (item) => {
                writer.write(item.getBytes());
            });
        }
        writer.writeVector(this.privacyRules, (item) => {
            writer.write(item.getBytes());
        });
        writer.writeLargeInt(this.randomId, 64);
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

    static fromReader(reader: BinaryReader): StartLive {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 2)) {
            const _pinned = true;
            args.pinned = _pinned;
        } else {
            args.pinned = false;
        }
        if (args.flags & (1 << 4)) {
            const _noforwards = true;
            args.noforwards = _noforwards;
        } else {
            args.noforwards = false;
        }
        if (args.flags & (1 << 5)) {
            const _rtmpStream = true;
            args.rtmpStream = _rtmpStream;
        } else {
            args.rtmpStream = false;
        }
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        if (args.flags & (1 << 0)) {
            const _caption = reader.tgReadString();
            args.caption = _caption;
        } else {
            args.caption = undefined;
        }
        if (args.flags & (1 << 1)) {
            const _entities = reader.readVector((reader) => {
                const item = reader.tgReadObject();
                return item;
            });
            args.entities = _entities;
        } else {
            args.entities = undefined;
        }
        const _privacyRules = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.privacyRules = _privacyRules;
        const _randomId = reader.readLargeInt(64);
        args.randomId = _randomId;
        if (args.flags & (1 << 6)) {
            const _messagesEnabled = reader.tgReadBool();
            args.messagesEnabled = _messagesEnabled;
        } else {
            args.messagesEnabled = undefined;
        }
        if (args.flags & (1 << 7)) {
            const _sendPaidMessagesStars = reader.readLargeInt(64);
            args.sendPaidMessagesStars = _sendPaidMessagesStars;
        } else {
            args.sendPaidMessagesStars = undefined;
        }
        return new StartLive(args);
    }
}