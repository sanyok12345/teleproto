import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeInputDocument } from "./TypeInputDocument";
import { TypeInputBotInlineMessage } from "./TypeInputBotInlineMessage";

export class InputBotInlineResultDocument extends TLObject {
    static CONSTRUCTOR_ID = 4294507972;
    static SUBCLASS_OF_ID = 2158273502;
    static className = "InputBotInlineResultDocument";
    static classType = "constructor";

    flags!: number;
    id!: string;
    type!: string;
    title?: string;
    description?: string;
    document!: TypeInputDocument;
    sendMessage!: TypeInputBotInlineMessage;

    constructor(args: { flags?: number, id?: string, type?: string, title?: string, description?: string, document?: TypeInputDocument, sendMessage?: TypeInputBotInlineMessage } = {}) {
        super();
        this.flags = args.flags!;
        this.id = args.id!;
        this.type = args.type!;
        this.title = args.title;
        this.description = args.description;
        this.document = args.document!;
        this.sendMessage = args.sendMessage!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(4294507972, false);
        let flags = 0;
        if (this.title !== undefined && this.title !== null) { flags |= 1 << 1; }
        if (this.description !== undefined && this.description !== null) { flags |= 1 << 2; }
        writer.writeInt(flags, false);
        writer.tgWriteString(this.id);
        writer.tgWriteString(this.type);
        if (this.title !== undefined && this.title !== null) {
            writer.tgWriteString(this.title);
        }
        if (this.description !== undefined && this.description !== null) {
            writer.tgWriteString(this.description);
        }
        writer.write(this.document.getBytes());
        writer.write(this.sendMessage.getBytes());
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputBotInlineResultDocument {
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
        const _document = reader.tgReadObject();
        args.document = _document;
        const _sendMessage = reader.tgReadObject();
        args.sendMessage = _sendMessage;
        return new InputBotInlineResultDocument(args);
    }
}