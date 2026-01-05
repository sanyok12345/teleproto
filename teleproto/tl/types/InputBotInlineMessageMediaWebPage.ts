import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeMessageEntity } from "./TypeMessageEntity";
import { TypeReplyMarkup } from "./TypeReplyMarkup";

export class InputBotInlineMessageMediaWebPage extends TLObject {
    static CONSTRUCTOR_ID = 3185362192;
    static SUBCLASS_OF_ID = 1408974864;
    static className = "InputBotInlineMessageMediaWebPage";
    static classType = "constructor";

    flags!: number;
    invertMedia?: boolean;
    forceLargeMedia?: boolean;
    forceSmallMedia?: boolean;
    optional?: boolean;
    message!: string;
    entities?: TypeMessageEntity[];
    url!: string;
    replyMarkup?: TypeReplyMarkup;

    constructor(args: { flags?: number, invertMedia?: boolean, forceLargeMedia?: boolean, forceSmallMedia?: boolean, optional?: boolean, message?: string, entities?: TypeMessageEntity[], url?: string, replyMarkup?: TypeReplyMarkup } = {}) {
        super();
        this.flags = args.flags!;
        this.invertMedia = args.invertMedia;
        this.forceLargeMedia = args.forceLargeMedia;
        this.forceSmallMedia = args.forceSmallMedia;
        this.optional = args.optional;
        this.message = args.message!;
        this.entities = args.entities;
        this.url = args.url!;
        this.replyMarkup = args.replyMarkup;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3185362192, false);
        let flags = 0;
        if (this.invertMedia) { flags |= 1 << 3; }
        if (this.forceLargeMedia) { flags |= 1 << 4; }
        if (this.forceSmallMedia) { flags |= 1 << 5; }
        if (this.optional) { flags |= 1 << 6; }
        if (this.entities !== undefined && this.entities !== null) { flags |= 1 << 1; }
        if (this.replyMarkup !== undefined && this.replyMarkup !== null) { flags |= 1 << 2; }
        writer.writeInt(flags, false);
        if (this.invertMedia !== undefined && this.invertMedia !== null) {
        }
        if (this.forceLargeMedia !== undefined && this.forceLargeMedia !== null) {
        }
        if (this.forceSmallMedia !== undefined && this.forceSmallMedia !== null) {
        }
        if (this.optional !== undefined && this.optional !== null) {
        }
        writer.tgWriteString(this.message);
        if (this.entities !== undefined && this.entities !== null) {
            writer.writeVector(this.entities, (item) => {
                writer.write(item.getBytes());
            });
        }
        writer.tgWriteString(this.url);
        if (this.replyMarkup !== undefined && this.replyMarkup !== null) {
            writer.write(this.replyMarkup.getBytes());
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputBotInlineMessageMediaWebPage {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 3)) {
            const _invertMedia = true;
            args.invertMedia = _invertMedia;
        } else {
            args.invertMedia = false;
        }
        if (args.flags & (1 << 4)) {
            const _forceLargeMedia = true;
            args.forceLargeMedia = _forceLargeMedia;
        } else {
            args.forceLargeMedia = false;
        }
        if (args.flags & (1 << 5)) {
            const _forceSmallMedia = true;
            args.forceSmallMedia = _forceSmallMedia;
        } else {
            args.forceSmallMedia = false;
        }
        if (args.flags & (1 << 6)) {
            const _optional = true;
            args.optional = _optional;
        } else {
            args.optional = false;
        }
        const _message = reader.tgReadString();
        args.message = _message;
        if (args.flags & (1 << 1)) {
            const _entities = reader.readVector((reader) => {
                const item = reader.tgReadObject();
                return item;
            });
            args.entities = _entities;
        } else {
            args.entities = undefined;
        }
        const _url = reader.tgReadString();
        args.url = _url;
        if (args.flags & (1 << 2)) {
            const _replyMarkup = reader.tgReadObject();
            args.replyMarkup = _replyMarkup;
        } else {
            args.replyMarkup = undefined;
        }
        return new InputBotInlineMessageMediaWebPage(args);
    }
}