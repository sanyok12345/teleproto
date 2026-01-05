import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class SponsoredMessageReportOption extends TLObject {
    static CONSTRUCTOR_ID = 1124938064;
    static SUBCLASS_OF_ID = 3711084312;
    static className = "SponsoredMessageReportOption";
    static classType = "constructor";

    text!: string;
    option!: Buffer;

    constructor(args: { text?: string, option?: Buffer } = {}) {
        super();
        this.text = args.text!;
        this.option = args.option!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1124938064, false);
        writer.tgWriteString(this.text);
        writer.tgWriteBytes(this.option);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): SponsoredMessageReportOption {
        const args: any = {};
        const _text = reader.tgReadString();
        args.text = _text;
        const _option = reader.tgReadBytes();
        args.option = _option;
        return new SponsoredMessageReportOption(args);
    }
}