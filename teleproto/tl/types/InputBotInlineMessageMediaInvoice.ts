import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeInputWebDocument } from "./TypeInputWebDocument";
import { TypeInvoice } from "./TypeInvoice";
import { TypeDataJSON } from "./TypeDataJSON";
import { TypeReplyMarkup } from "./TypeReplyMarkup";

export class InputBotInlineMessageMediaInvoice extends TLObject {
    static CONSTRUCTOR_ID = 3622273573;
    static SUBCLASS_OF_ID = 1408974864;
    static className = "InputBotInlineMessageMediaInvoice";
    static classType = "constructor";

    flags!: number;
    title!: string;
    description!: string;
    photo?: TypeInputWebDocument;
    invoice!: TypeInvoice;
    payload!: Buffer;
    provider!: string;
    providerData!: TypeDataJSON;
    replyMarkup?: TypeReplyMarkup;

    constructor(args: { flags?: number, title?: string, description?: string, photo?: TypeInputWebDocument, invoice?: TypeInvoice, payload?: Buffer, provider?: string, providerData?: TypeDataJSON, replyMarkup?: TypeReplyMarkup } = {}) {
        super();
        this.flags = args.flags!;
        this.title = args.title!;
        this.description = args.description!;
        this.photo = args.photo;
        this.invoice = args.invoice!;
        this.payload = args.payload!;
        this.provider = args.provider!;
        this.providerData = args.providerData!;
        this.replyMarkup = args.replyMarkup;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3622273573, false);
        let flags = 0;
        if (this.photo !== undefined && this.photo !== null) { flags |= 1 << 0; }
        if (this.replyMarkup !== undefined && this.replyMarkup !== null) { flags |= 1 << 2; }
        writer.writeInt(flags, false);
        writer.tgWriteString(this.title);
        writer.tgWriteString(this.description);
        if (this.photo !== undefined && this.photo !== null) {
            writer.write(this.photo.getBytes());
        }
        writer.write(this.invoice.getBytes());
        writer.tgWriteBytes(this.payload);
        writer.tgWriteString(this.provider);
        writer.write(this.providerData.getBytes());
        if (this.replyMarkup !== undefined && this.replyMarkup !== null) {
            writer.write(this.replyMarkup.getBytes());
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputBotInlineMessageMediaInvoice {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        const _title = reader.tgReadString();
        args.title = _title;
        const _description = reader.tgReadString();
        args.description = _description;
        if (args.flags & (1 << 0)) {
            const _photo = reader.tgReadObject();
            args.photo = _photo;
        } else {
            args.photo = undefined;
        }
        const _invoice = reader.tgReadObject();
        args.invoice = _invoice;
        const _payload = reader.tgReadBytes();
        args.payload = _payload;
        const _provider = reader.tgReadString();
        args.provider = _provider;
        const _providerData = reader.tgReadObject();
        args.providerData = _providerData;
        if (args.flags & (1 << 2)) {
            const _replyMarkup = reader.tgReadObject();
            args.replyMarkup = _replyMarkup;
        } else {
            args.replyMarkup = undefined;
        }
        return new InputBotInlineMessageMediaInvoice(args);
    }
}