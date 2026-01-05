import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class WebPagePending extends TLObject {
    static CONSTRUCTOR_ID = 2966502983;
    static SUBCLASS_OF_ID = 1437168769;
    static className = "WebPagePending";
    static classType = "constructor";

    flags!: number;
    id!: bigint;
    url?: string;
    date!: number;

    constructor(args: { flags?: number, id?: bigint, url?: string, date?: number } = {}) {
        super();
        this.flags = args.flags!;
        this.id = args.id!;
        this.url = args.url;
        this.date = args.date!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2966502983, false);
        let flags = 0;
        if (this.url !== undefined && this.url !== null) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        writer.writeLargeInt(this.id, 64);
        if (this.url !== undefined && this.url !== null) {
            writer.tgWriteString(this.url);
        }
        writer.writeInt(this.date);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): WebPagePending {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        const _id = reader.readLargeInt(64);
        args.id = _id;
        if (args.flags & (1 << 0)) {
            const _url = reader.tgReadString();
            args.url = _url;
        } else {
            args.url = undefined;
        }
        const _date = reader.readInt();
        args.date = _date;
        return new WebPagePending(args);
    }
}