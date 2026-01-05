import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { TypeInputMedia } from "../../types/TypeInputMedia";
import { TypeReplyMarkup } from "../../types/TypeReplyMarkup";
import { TypeMessageEntity } from "../../types/TypeMessageEntity";
import { TypeUpdates } from "../../types/TypeUpdates";

export class EditMessage extends MTProtoRequest {
    static CONSTRUCTOR_ID = 1374175969;
    static SUBCLASS_OF_ID = 2331323052;
    static className = "messages.EditMessage";
    static classType = "request";

    flags?: number;
    noWebpage?: boolean;
    invertMedia?: boolean;
    peer?: EntityLike;
    id?: number;
    message?: string;
    media?: TypeInputMedia;
    replyMarkup?: TypeReplyMarkup;
    entities?: TypeMessageEntity[];
    scheduleDate?: number;
    scheduleRepeatPeriod?: number;
    quickReplyShortcutId?: number;

    constructor(args: { flags?: number, noWebpage?: boolean, invertMedia?: boolean, peer?: EntityLike, id?: number, message?: string, media?: TypeInputMedia, replyMarkup?: TypeReplyMarkup, entities?: TypeMessageEntity[], scheduleDate?: number, scheduleRepeatPeriod?: number, quickReplyShortcutId?: number } = {}) {
        super();
        this.flags = args.flags;
        this.noWebpage = args.noWebpage;
        this.invertMedia = args.invertMedia;
        this.peer = args.peer;
        this.id = args.id;
        this.message = args.message;
        this.media = args.media;
        this.replyMarkup = args.replyMarkup;
        this.entities = args.entities;
        this.scheduleDate = args.scheduleDate;
        this.scheduleRepeatPeriod = args.scheduleRepeatPeriod;
        this.quickReplyShortcutId = args.quickReplyShortcutId;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1374175969, false);
        let flags = 0;
        if (this.noWebpage) { flags |= 1 << 1; }
        if (this.invertMedia) { flags |= 1 << 16; }
        if (this.message !== undefined && this.message !== null) { flags |= 1 << 11; }
        if (this.media !== undefined && this.media !== null) { flags |= 1 << 14; }
        if (this.replyMarkup !== undefined && this.replyMarkup !== null) { flags |= 1 << 2; }
        if (this.entities !== undefined && this.entities !== null) { flags |= 1 << 3; }
        if (this.scheduleDate !== undefined && this.scheduleDate !== null) { flags |= 1 << 15; }
        if (this.scheduleRepeatPeriod !== undefined && this.scheduleRepeatPeriod !== null) { flags |= 1 << 18; }
        if (this.quickReplyShortcutId !== undefined && this.quickReplyShortcutId !== null) { flags |= 1 << 17; }
        writer.writeInt(flags, false);
        if (this.noWebpage !== undefined && this.noWebpage !== null) {
        }
        if (this.invertMedia !== undefined && this.invertMedia !== null) {
        }
        writer.write((this.peer! as any).getBytes());
        writer.writeInt(this.id!);
        if (this.message !== undefined && this.message !== null) {
            writer.tgWriteString(this.message);
        }
        if (this.media !== undefined && this.media !== null) {
            writer.write(this.media.getBytes());
        }
        if (this.replyMarkup !== undefined && this.replyMarkup !== null) {
            writer.write(this.replyMarkup.getBytes());
        }
        if (this.entities !== undefined && this.entities !== null) {
            writer.writeVector(this.entities, (item) => {
                writer.write(item.getBytes());
            });
        }
        if (this.scheduleDate !== undefined && this.scheduleDate !== null) {
            writer.writeInt(this.scheduleDate);
        }
        if (this.scheduleRepeatPeriod !== undefined && this.scheduleRepeatPeriod !== null) {
            writer.writeInt(this.scheduleRepeatPeriod);
        }
        if (this.quickReplyShortcutId !== undefined && this.quickReplyShortcutId !== null) {
            writer.writeInt(this.quickReplyShortcutId);
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

    static fromReader(reader: BinaryReader): EditMessage {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 1)) {
            const _noWebpage = true;
            args.noWebpage = _noWebpage;
        } else {
            args.noWebpage = false;
        }
        if (args.flags & (1 << 16)) {
            const _invertMedia = true;
            args.invertMedia = _invertMedia;
        } else {
            args.invertMedia = false;
        }
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        const _id = reader.readInt();
        args.id = _id;
        if (args.flags & (1 << 11)) {
            const _message = reader.tgReadString();
            args.message = _message;
        } else {
            args.message = undefined;
        }
        if (args.flags & (1 << 14)) {
            const _media = reader.tgReadObject();
            args.media = _media;
        } else {
            args.media = undefined;
        }
        if (args.flags & (1 << 2)) {
            const _replyMarkup = reader.tgReadObject();
            args.replyMarkup = _replyMarkup;
        } else {
            args.replyMarkup = undefined;
        }
        if (args.flags & (1 << 3)) {
            const _entities = reader.readVector((reader) => {
                const item = reader.tgReadObject();
                return item;
            });
            args.entities = _entities;
        } else {
            args.entities = undefined;
        }
        if (args.flags & (1 << 15)) {
            const _scheduleDate = reader.readInt();
            args.scheduleDate = _scheduleDate;
        } else {
            args.scheduleDate = undefined;
        }
        if (args.flags & (1 << 18)) {
            const _scheduleRepeatPeriod = reader.readInt();
            args.scheduleRepeatPeriod = _scheduleRepeatPeriod;
        } else {
            args.scheduleRepeatPeriod = undefined;
        }
        if (args.flags & (1 << 17)) {
            const _quickReplyShortcutId = reader.readInt();
            args.quickReplyShortcutId = _quickReplyShortcutId;
        } else {
            args.quickReplyShortcutId = undefined;
        }
        return new EditMessage(args);
    }
}