import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeMessageReportOption } from "./TypeMessageReportOption";

export class ReportResultChooseOption extends TLObject {
    static CONSTRUCTOR_ID = 4041531574;
    static SUBCLASS_OF_ID = 2899571768;
    static className = "ReportResultChooseOption";
    static classType = "constructor";

    title!: string;
    options!: TypeMessageReportOption[];

    constructor(args: { title?: string, options?: TypeMessageReportOption[] } = {}) {
        super();
        this.title = args.title!;
        this.options = args.options!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(4041531574, false);
        writer.tgWriteString(this.title);
        writer.writeVector(this.options, (item) => {
            writer.write(item.getBytes());
        });
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): ReportResultChooseOption {
        const args: any = {};
        const _title = reader.tgReadString();
        args.title = _title;
        const _options = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.options = _options;
        return new ReportResultChooseOption(args);
    }
}