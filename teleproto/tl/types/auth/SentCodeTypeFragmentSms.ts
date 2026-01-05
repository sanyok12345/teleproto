import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";

export class SentCodeTypeFragmentSms extends TLObject {
    static CONSTRUCTOR_ID = 3646315577;
    static SUBCLASS_OF_ID = 4284159374;
    static className = "auth.SentCodeTypeFragmentSms";
    static classType = "constructor";

    url!: string;
    length!: number;

    constructor(args: { url?: string, length?: number } = {}) {
        super();
        this.url = args.url!;
        this.length = args.length!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3646315577, false);
        writer.tgWriteString(this.url);
        writer.writeInt(this.length);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): SentCodeTypeFragmentSms {
        const args: any = {};
        const _url = reader.tgReadString();
        args.url = _url;
        const _length = reader.readInt();
        args.length = _length;
        return new SentCodeTypeFragmentSms(args);
    }
}