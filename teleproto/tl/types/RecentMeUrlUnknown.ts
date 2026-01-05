import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class RecentMeUrlUnknown extends TLObject {
    static CONSTRUCTOR_ID = 1189204285;
    static SUBCLASS_OF_ID = 1436889209;
    static className = "RecentMeUrlUnknown";
    static classType = "constructor";

    url!: string;

    constructor(args: { url?: string } = {}) {
        super();
        this.url = args.url!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1189204285, false);
        writer.tgWriteString(this.url);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): RecentMeUrlUnknown {
        const args: any = {};
        const _url = reader.tgReadString();
        args.url = _url;
        return new RecentMeUrlUnknown(args);
    }
}