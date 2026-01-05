import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeGeoPoint } from "./TypeGeoPoint";
import { TypeReplyMarkup } from "./TypeReplyMarkup";

export class BotInlineMessageMediaVenue extends TLObject {
    static CONSTRUCTOR_ID = 2324063644;
    static SUBCLASS_OF_ID = 3297841032;
    static className = "BotInlineMessageMediaVenue";
    static classType = "constructor";

    flags!: number;
    geo!: TypeGeoPoint;
    title!: string;
    address!: string;
    provider!: string;
    venueId!: string;
    venueType!: string;
    replyMarkup?: TypeReplyMarkup;

    constructor(args: { flags?: number, geo?: TypeGeoPoint, title?: string, address?: string, provider?: string, venueId?: string, venueType?: string, replyMarkup?: TypeReplyMarkup } = {}) {
        super();
        this.flags = args.flags!;
        this.geo = args.geo!;
        this.title = args.title!;
        this.address = args.address!;
        this.provider = args.provider!;
        this.venueId = args.venueId!;
        this.venueType = args.venueType!;
        this.replyMarkup = args.replyMarkup;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2324063644, false);
        let flags = 0;
        if (this.replyMarkup !== undefined && this.replyMarkup !== null) { flags |= 1 << 2; }
        writer.writeInt(flags, false);
        writer.write(this.geo.getBytes());
        writer.tgWriteString(this.title);
        writer.tgWriteString(this.address);
        writer.tgWriteString(this.provider);
        writer.tgWriteString(this.venueId);
        writer.tgWriteString(this.venueType);
        if (this.replyMarkup !== undefined && this.replyMarkup !== null) {
            writer.write(this.replyMarkup.getBytes());
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): BotInlineMessageMediaVenue {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        const _geo = reader.tgReadObject();
        args.geo = _geo;
        const _title = reader.tgReadString();
        args.title = _title;
        const _address = reader.tgReadString();
        args.address = _address;
        const _provider = reader.tgReadString();
        args.provider = _provider;
        const _venueId = reader.tgReadString();
        args.venueId = _venueId;
        const _venueType = reader.tgReadString();
        args.venueType = _venueType;
        if (args.flags & (1 << 2)) {
            const _replyMarkup = reader.tgReadObject();
            args.replyMarkup = _replyMarkup;
        } else {
            args.replyMarkup = undefined;
        }
        return new BotInlineMessageMediaVenue(args);
    }
}