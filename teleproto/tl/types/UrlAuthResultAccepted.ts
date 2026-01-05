import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class UrlAuthResultAccepted extends TLObject {
    static CONSTRUCTOR_ID = 2408320590;
    static SUBCLASS_OF_ID = 2003159838;
    static className = "UrlAuthResultAccepted";
    static classType = "constructor";

    url!: string;

    constructor(args: { url?: string } = {}) {
        super();
        this.url = args.url!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2408320590, false);
        writer.tgWriteString(this.url);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): UrlAuthResultAccepted {
        const args: any = {};
        const _url = reader.tgReadString();
        args.url = _url;
        return new UrlAuthResultAccepted(args);
    }
}