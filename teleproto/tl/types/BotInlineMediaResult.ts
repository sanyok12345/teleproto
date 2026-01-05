import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypePhoto } from "./TypePhoto";
import { TypeDocument } from "./TypeDocument";
import { TypeBotInlineMessage } from "./TypeBotInlineMessage";

export class BotInlineMediaResult extends TLObject {
    static CONSTRUCTOR_ID = 400266251;
    static SUBCLASS_OF_ID = 942846933;
    static className = "BotInlineMediaResult";
    static classType = "constructor";

    flags!: number;
    id!: string;
    type!: string;
    photo?: TypePhoto;
    document?: TypeDocument;
    title?: string;
    description?: string;
    sendMessage!: TypeBotInlineMessage;

    constructor(args: { flags?: number, id?: string, type?: string, photo?: TypePhoto, document?: TypeDocument, title?: string, description?: string, sendMessage?: TypeBotInlineMessage } = {}) {
        super();
        this.flags = args.flags!;
        this.id = args.id!;
        this.type = args.type!;
        this.photo = args.photo;
        this.document = args.document;
        this.title = args.title;
        this.description = args.description;
        this.sendMessage = args.sendMessage!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(400266251, false);
        let flags = 0;
        if (this.photo !== undefined && this.photo !== null) { flags |= 1 << 0; }
        if (this.document !== undefined && this.document !== null) { flags |= 1 << 1; }
        if (this.title !== undefined && this.title !== null) { flags |= 1 << 2; }
        if (this.description !== undefined && this.description !== null) { flags |= 1 << 3; }
        writer.writeInt(flags, false);
        writer.tgWriteString(this.id);
        writer.tgWriteString(this.type);
        if (this.photo !== undefined && this.photo !== null) {
            writer.write(this.photo.getBytes());
        }
        if (this.document !== undefined && this.document !== null) {
            writer.write(this.document.getBytes());
        }
        if (this.title !== undefined && this.title !== null) {
            writer.tgWriteString(this.title);
        }
        if (this.description !== undefined && this.description !== null) {
            writer.tgWriteString(this.description);
        }
        writer.write(this.sendMessage.getBytes());
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): BotInlineMediaResult {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        const _id = reader.tgReadString();
        args.id = _id;
        const _type = reader.tgReadString();
        args.type = _type;
        if (args.flags & (1 << 0)) {
            const _photo = reader.tgReadObject();
            args.photo = _photo;
        } else {
            args.photo = undefined;
        }
        if (args.flags & (1 << 1)) {
            const _document = reader.tgReadObject();
            args.document = _document;
        } else {
            args.document = undefined;
        }
        if (args.flags & (1 << 2)) {
            const _title = reader.tgReadString();
            args.title = _title;
        } else {
            args.title = undefined;
        }
        if (args.flags & (1 << 3)) {
            const _description = reader.tgReadString();
            args.description = _description;
        } else {
            args.description = undefined;
        }
        const _sendMessage = reader.tgReadObject();
        args.sendMessage = _sendMessage;
        return new BotInlineMediaResult(args);
    }
}