import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class StatsURL extends TLObject {
    static CONSTRUCTOR_ID = 1202287072;
    static SUBCLASS_OF_ID = 2370606272;
    static className = "StatsURL";
    static classType = "constructor";

    url!: string;

    constructor(args: { url?: string } = {}) {
        super();
        this.url = args.url!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1202287072, false);
        writer.tgWriteString(this.url);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): StatsURL {
        const args: any = {};
        const _url = reader.tgReadString();
        args.url = _url;
        return new StatsURL(args);
    }
}