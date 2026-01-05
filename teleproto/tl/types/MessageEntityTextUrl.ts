import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class MessageEntityTextUrl extends TLObject {
    static CONSTRUCTOR_ID = 1990644519;
    static SUBCLASS_OF_ID = 3479443932;
    static className = "MessageEntityTextUrl";
    static classType = "constructor";

    offset!: number;
    length!: number;
    url!: string;

    constructor(args: { offset?: number, length?: number, url?: string } = {}) {
        super();
        this.offset = args.offset!;
        this.length = args.length!;
        this.url = args.url!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1990644519, false);
        writer.writeInt(this.offset);
        writer.writeInt(this.length);
        writer.tgWriteString(this.url);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): MessageEntityTextUrl {
        const args: any = {};
        const _offset = reader.readInt();
        args.offset = _offset;
        const _length = reader.readInt();
        args.length = _length;
        const _url = reader.tgReadString();
        args.url = _url;
        return new MessageEntityTextUrl(args);
    }
}