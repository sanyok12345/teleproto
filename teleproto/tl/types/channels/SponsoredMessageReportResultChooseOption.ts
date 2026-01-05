import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";
import { TypeSponsoredMessageReportOption } from "../TypeSponsoredMessageReportOption";

export class SponsoredMessageReportResultChooseOption extends TLObject {
    static CONSTRUCTOR_ID = 2221907522;
    static SUBCLASS_OF_ID = 639834146;
    static className = "channels.SponsoredMessageReportResultChooseOption";
    static classType = "constructor";

    title!: string;
    options!: TypeSponsoredMessageReportOption[];

    constructor(args: { title?: string, options?: TypeSponsoredMessageReportOption[] } = {}) {
        super();
        this.title = args.title!;
        this.options = args.options!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2221907522, false);
        writer.tgWriteString(this.title);
        writer.writeVector(this.options, (item) => {
            writer.write(item.getBytes());
        });
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): SponsoredMessageReportResultChooseOption {
        const args: any = {};
        const _title = reader.tgReadString();
        args.title = _title;
        const _options = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.options = _options;
        return new SponsoredMessageReportResultChooseOption(args);
    }
}