import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class WebPageEmpty extends TLObject {
    static CONSTRUCTOR_ID = 555358088;
    static SUBCLASS_OF_ID = 1437168769;
    static className = "WebPageEmpty";
    static classType = "constructor";

    flags!: number;
    id!: bigint;
    url?: string;

    constructor(args: { flags?: number, id?: bigint, url?: string } = {}) {
        super();
        this.flags = args.flags!;
        this.id = args.id!;
        this.url = args.url;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(555358088, false);
        let flags = 0;
        if (this.url !== undefined && this.url !== null) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        writer.writeLargeInt(this.id, 64);
        if (this.url !== undefined && this.url !== null) {
            writer.tgWriteString(this.url);
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): WebPageEmpty {
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
        return new WebPageEmpty(args);
    }
}