import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeWebDocument } from "./TypeWebDocument";
import { TypeMessageExtendedMedia } from "./TypeMessageExtendedMedia";

export class MessageMediaInvoice extends TLObject {
    static CONSTRUCTOR_ID = 4138027219;
    static SUBCLASS_OF_ID = 1198308914;
    static className = "MessageMediaInvoice";
    static classType = "constructor";

    flags!: number;
    shippingAddressRequested?: boolean;
    test?: boolean;
    title!: string;
    description!: string;
    photo?: TypeWebDocument;
    receiptMsgId?: number;
    currency!: string;
    totalAmount!: bigint;
    startParam!: string;
    extendedMedia?: TypeMessageExtendedMedia;

    constructor(args: { flags?: number, shippingAddressRequested?: boolean, test?: boolean, title?: string, description?: string, photo?: TypeWebDocument, receiptMsgId?: number, currency?: string, totalAmount?: bigint, startParam?: string, extendedMedia?: TypeMessageExtendedMedia } = {}) {
        super();
        this.flags = args.flags!;
        this.shippingAddressRequested = args.shippingAddressRequested;
        this.test = args.test;
        this.title = args.title!;
        this.description = args.description!;
        this.photo = args.photo;
        this.receiptMsgId = args.receiptMsgId;
        this.currency = args.currency!;
        this.totalAmount = args.totalAmount!;
        this.startParam = args.startParam!;
        this.extendedMedia = args.extendedMedia;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(4138027219, false);
        let flags = 0;
        if (this.shippingAddressRequested) { flags |= 1 << 1; }
        if (this.test) { flags |= 1 << 3; }
        if (this.photo !== undefined && this.photo !== null) { flags |= 1 << 0; }
        if (this.receiptMsgId !== undefined && this.receiptMsgId !== null) { flags |= 1 << 2; }
        if (this.extendedMedia !== undefined && this.extendedMedia !== null) { flags |= 1 << 4; }
        writer.writeInt(flags, false);
        if (this.shippingAddressRequested !== undefined && this.shippingAddressRequested !== null) {
        }
        if (this.test !== undefined && this.test !== null) {
        }
        writer.tgWriteString(this.title);
        writer.tgWriteString(this.description);
        if (this.photo !== undefined && this.photo !== null) {
            writer.write(this.photo.getBytes());
        }
        if (this.receiptMsgId !== undefined && this.receiptMsgId !== null) {
            writer.writeInt(this.receiptMsgId);
        }
        writer.tgWriteString(this.currency);
        writer.writeLargeInt(this.totalAmount, 64);
        writer.tgWriteString(this.startParam);
        if (this.extendedMedia !== undefined && this.extendedMedia !== null) {
            writer.write(this.extendedMedia.getBytes());
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): MessageMediaInvoice {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 1)) {
            const _shippingAddressRequested = true;
            args.shippingAddressRequested = _shippingAddressRequested;
        } else {
            args.shippingAddressRequested = false;
        }
        if (args.flags & (1 << 3)) {
            const _test = true;
            args.test = _test;
        } else {
            args.test = false;
        }
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
        if (args.flags & (1 << 2)) {
            const _receiptMsgId = reader.readInt();
            args.receiptMsgId = _receiptMsgId;
        } else {
            args.receiptMsgId = undefined;
        }
        const _currency = reader.tgReadString();
        args.currency = _currency;
        const _totalAmount = reader.readLargeInt(64);
        args.totalAmount = _totalAmount;
        const _startParam = reader.tgReadString();
        args.startParam = _startParam;
        if (args.flags & (1 << 4)) {
            const _extendedMedia = reader.tgReadObject();
            args.extendedMedia = _extendedMedia;
        } else {
            args.extendedMedia = undefined;
        }
        return new MessageMediaInvoice(args);
    }
}