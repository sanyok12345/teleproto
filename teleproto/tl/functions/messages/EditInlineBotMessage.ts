import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeInputBotInlineMessageID } from "../../types/TypeInputBotInlineMessageID";
import { TypeInputMedia } from "../../types/TypeInputMedia";
import { TypeReplyMarkup } from "../../types/TypeReplyMarkup";
import { TypeMessageEntity } from "../../types/TypeMessageEntity";

export class EditInlineBotMessage extends MTProtoRequest {
    static CONSTRUCTOR_ID = 2203418042;
    static SUBCLASS_OF_ID = 4122188204;
    static className = "messages.EditInlineBotMessage";
    static classType = "request";

    flags?: number;
    noWebpage?: boolean;
    invertMedia?: boolean;
    id?: TypeInputBotInlineMessageID;
    message?: string;
    media?: TypeInputMedia;
    replyMarkup?: TypeReplyMarkup;
    entities?: TypeMessageEntity[];

    constructor(args: { flags?: number, noWebpage?: boolean, invertMedia?: boolean, id?: TypeInputBotInlineMessageID, message?: string, media?: TypeInputMedia, replyMarkup?: TypeReplyMarkup, entities?: TypeMessageEntity[] } = {}) {
        super();
        this.flags = args.flags;
        this.noWebpage = args.noWebpage;
        this.invertMedia = args.invertMedia;
        this.id = args.id;
        this.message = args.message;
        this.media = args.media;
        this.replyMarkup = args.replyMarkup;
        this.entities = args.entities;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2203418042, false);
        let flags = 0;
        if (this.noWebpage) { flags |= 1 << 1; }
        if (this.invertMedia) { flags |= 1 << 16; }
        if (this.message !== undefined && this.message !== null) { flags |= 1 << 11; }
        if (this.media !== undefined && this.media !== null) { flags |= 1 << 14; }
        if (this.replyMarkup !== undefined && this.replyMarkup !== null) { flags |= 1 << 2; }
        if (this.entities !== undefined && this.entities !== null) { flags |= 1 << 3; }
        writer.writeInt(flags, false);
        if (this.noWebpage !== undefined && this.noWebpage !== null) {
        }
        if (this.invertMedia !== undefined && this.invertMedia !== null) {
        }
        writer.write(this.id!.getBytes());
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
        return writer.getValue();
    }

    readResult(reader: BinaryReader): boolean {
        const result = reader.tgReadBool();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): EditInlineBotMessage {
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
        const _id = reader.tgReadObject();
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
        return new EditInlineBotMessage(args);
    }
}