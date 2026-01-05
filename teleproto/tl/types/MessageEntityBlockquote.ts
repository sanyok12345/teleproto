import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class MessageEntityBlockquote extends TLObject {
    static CONSTRUCTOR_ID = 4056722092;
    static SUBCLASS_OF_ID = 3479443932;
    static className = "MessageEntityBlockquote";
    static classType = "constructor";

    flags!: number;
    collapsed?: boolean;
    offset!: number;
    length!: number;

    constructor(args: { flags?: number, collapsed?: boolean, offset?: number, length?: number } = {}) {
        super();
        this.flags = args.flags!;
        this.collapsed = args.collapsed;
        this.offset = args.offset!;
        this.length = args.length!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(4056722092, false);
        let flags = 0;
        if (this.collapsed) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        if (this.collapsed !== undefined && this.collapsed !== null) {
        }
        writer.writeInt(this.offset);
        writer.writeInt(this.length);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): MessageEntityBlockquote {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _collapsed = true;
            args.collapsed = _collapsed;
        } else {
            args.collapsed = false;
        }
        const _offset = reader.readInt();
        args.offset = _offset;
        const _length = reader.readInt();
        args.length = _length;
        return new MessageEntityBlockquote(args);
    }
}