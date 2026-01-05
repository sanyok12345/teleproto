import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeInputWebDocument } from "./TypeInputWebDocument";
import { TypeInputBotInlineMessage } from "./TypeInputBotInlineMessage";

export class InputBotInlineResult extends TLObject {
    static CONSTRUCTOR_ID = 2294256409;
    static SUBCLASS_OF_ID = 2158273502;
    static className = "InputBotInlineResult";
    static classType = "constructor";

    flags!: number;
    id!: string;
    type!: string;
    title?: string;
    description?: string;
    url?: string;
    thumb?: TypeInputWebDocument;
    content?: TypeInputWebDocument;
    sendMessage!: TypeInputBotInlineMessage;

    constructor(args: { flags?: number, id?: string, type?: string, title?: string, description?: string, url?: string, thumb?: TypeInputWebDocument, content?: TypeInputWebDocument, sendMessage?: TypeInputBotInlineMessage } = {}) {
        super();
        this.flags = args.flags!;
        this.id = args.id!;
        this.type = args.type!;
        this.title = args.title;
        this.description = args.description;
        this.url = args.url;
        this.thumb = args.thumb;
        this.content = args.content;
        this.sendMessage = args.sendMessage!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2294256409, false);
        let flags = 0;
        if (this.title !== undefined && this.title !== null) { flags |= 1 << 1; }
        if (this.description !== undefined && this.description !== null) { flags |= 1 << 2; }
        if (this.url !== undefined && this.url !== null) { flags |= 1 << 3; }
        if (this.thumb !== undefined && this.thumb !== null) { flags |= 1 << 4; }
        if (this.content !== undefined && this.content !== null) { flags |= 1 << 5; }
        writer.writeInt(flags, false);
        writer.tgWriteString(this.id);
        writer.tgWriteString(this.type);
        if (this.title !== undefined && this.title !== null) {
            writer.tgWriteString(this.title);
        }
        if (this.description !== undefined && this.description !== null) {
            writer.tgWriteString(this.description);
        }
        if (this.url !== undefined && this.url !== null) {
            writer.tgWriteString(this.url);
        }
        if (this.thumb !== undefined && this.thumb !== null) {
            writer.write(this.thumb.getBytes());
        }
        if (this.content !== undefined && this.content !== null) {
            writer.write(this.content.getBytes());
        }
        writer.write(this.sendMessage.getBytes());
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputBotInlineResult {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        const _id = reader.tgReadString();
        args.id = _id;
        const _type = reader.tgReadString();
        args.type = _type;
        if (args.flags & (1 << 1)) {
            const _title = reader.tgReadString();
            args.title = _title;
        } else {
            args.title = undefined;
        }
        if (args.flags & (1 << 2)) {
            const _description = reader.tgReadString();
            args.description = _description;
        } else {
            args.description = undefined;
        }
        if (args.flags & (1 << 3)) {
            const _url = reader.tgReadString();
            args.url = _url;
        } else {
            args.url = undefined;
        }
        if (args.flags & (1 << 4)) {
            const _thumb = reader.tgReadObject();
            args.thumb = _thumb;
        } else {
            args.thumb = undefined;
        }
        if (args.flags & (1 << 5)) {
            const _content = reader.tgReadObject();
            args.content = _content;
        } else {
            args.content = undefined;
        }
        const _sendMessage = reader.tgReadObject();
        args.sendMessage = _sendMessage;
        return new InputBotInlineResult(args);
    }
}