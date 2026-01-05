import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeInputWebDocument } from "./TypeInputWebDocument";
import { TypeInvoice } from "./TypeInvoice";
import { TypeDataJSON } from "./TypeDataJSON";
import { TypeInputMedia } from "./TypeInputMedia";

export class InputMediaInvoice extends TLObject {
    static CONSTRUCTOR_ID = 1080028941;
    static SUBCLASS_OF_ID = 4210575092;
    static className = "InputMediaInvoice";
    static classType = "constructor";

    flags!: number;
    title!: string;
    description!: string;
    photo?: TypeInputWebDocument;
    invoice!: TypeInvoice;
    payload!: Buffer;
    provider?: string;
    providerData!: TypeDataJSON;
    startParam?: string;
    extendedMedia?: TypeInputMedia;

    constructor(args: { flags?: number, title?: string, description?: string, photo?: TypeInputWebDocument, invoice?: TypeInvoice, payload?: Buffer, provider?: string, providerData?: TypeDataJSON, startParam?: string, extendedMedia?: TypeInputMedia } = {}) {
        super();
        this.flags = args.flags!;
        this.title = args.title!;
        this.description = args.description!;
        this.photo = args.photo;
        this.invoice = args.invoice!;
        this.payload = args.payload!;
        this.provider = args.provider;
        this.providerData = args.providerData!;
        this.startParam = args.startParam;
        this.extendedMedia = args.extendedMedia;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1080028941, false);
        let flags = 0;
        if (this.photo !== undefined && this.photo !== null) { flags |= 1 << 0; }
        if (this.provider !== undefined && this.provider !== null) { flags |= 1 << 3; }
        if (this.startParam !== undefined && this.startParam !== null) { flags |= 1 << 1; }
        if (this.extendedMedia !== undefined && this.extendedMedia !== null) { flags |= 1 << 2; }
        writer.writeInt(flags, false);
        writer.tgWriteString(this.title);
        writer.tgWriteString(this.description);
        if (this.photo !== undefined && this.photo !== null) {
            writer.write(this.photo.getBytes());
        }
        writer.write(this.invoice.getBytes());
        writer.tgWriteBytes(this.payload);
        if (this.provider !== undefined && this.provider !== null) {
            writer.tgWriteString(this.provider);
        }
        writer.write(this.providerData.getBytes());
        if (this.startParam !== undefined && this.startParam !== null) {
            writer.tgWriteString(this.startParam);
        }
        if (this.extendedMedia !== undefined && this.extendedMedia !== null) {
            writer.write(this.extendedMedia.getBytes());
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputMediaInvoice {
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
        if (args.flags & (1 << 3)) {
            const _provider = reader.tgReadString();
            args.provider = _provider;
        } else {
            args.provider = undefined;
        }
        const _providerData = reader.tgReadObject();
        args.providerData = _providerData;
        if (args.flags & (1 << 1)) {
            const _startParam = reader.tgReadString();
            args.startParam = _startParam;
        } else {
            args.startParam = undefined;
        }
        if (args.flags & (1 << 2)) {
            const _extendedMedia = reader.tgReadObject();
            args.extendedMedia = _extendedMedia;
        } else {
            args.extendedMedia = undefined;
        }
        return new InputMediaInvoice(args);
    }
}