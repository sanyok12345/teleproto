import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeMessageEntity } from "./TypeMessageEntity";
import { TypeReplyMarkup } from "./TypeReplyMarkup";

export class BotInlineMessageMediaAuto extends TLObject {
    static CONSTRUCTOR_ID = 1984755728;
    static SUBCLASS_OF_ID = 3297841032;
    static className = "BotInlineMessageMediaAuto";
    static classType = "constructor";

    flags!: number;
    invertMedia?: boolean;
    message!: string;
    entities?: TypeMessageEntity[];
    replyMarkup?: TypeReplyMarkup;

    constructor(args: { flags?: number, invertMedia?: boolean, message?: string, entities?: TypeMessageEntity[], replyMarkup?: TypeReplyMarkup } = {}) {
        super();
        this.flags = args.flags!;
        this.invertMedia = args.invertMedia;
        this.message = args.message!;
        this.entities = args.entities;
        this.replyMarkup = args.replyMarkup;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1984755728, false);
        let flags = 0;
        if (this.invertMedia) { flags |= 1 << 3; }
        if (this.entities !== undefined && this.entities !== null) { flags |= 1 << 1; }
        if (this.replyMarkup !== undefined && this.replyMarkup !== null) { flags |= 1 << 2; }
        writer.writeInt(flags, false);
        if (this.invertMedia !== undefined && this.invertMedia !== null) {
        }
        writer.tgWriteString(this.message);
        if (this.entities !== undefined && this.entities !== null) {
            writer.writeVector(this.entities, (item) => {
                writer.write(item.getBytes());
            });
        }
        if (this.replyMarkup !== undefined && this.replyMarkup !== null) {
            writer.write(this.replyMarkup.getBytes());
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): BotInlineMessageMediaAuto {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 3)) {
            const _invertMedia = true;
            args.invertMedia = _invertMedia;
        } else {
            args.invertMedia = false;
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
        if (args.flags & (1 << 2)) {
            const _replyMarkup = reader.tgReadObject();
            args.replyMarkup = _replyMarkup;
        } else {
            args.replyMarkup = undefined;
        }
        return new BotInlineMessageMediaAuto(args);
    }
}