import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class MessageEntityCustomEmoji extends TLObject {
    static CONSTRUCTOR_ID = 3369010680;
    static SUBCLASS_OF_ID = 3479443932;
    static className = "MessageEntityCustomEmoji";
    static classType = "constructor";

    offset!: number;
    length!: number;
    documentId!: bigint;

    constructor(args: { offset?: number, length?: number, documentId?: bigint } = {}) {
        super();
        this.offset = args.offset!;
        this.length = args.length!;
        this.documentId = args.documentId!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3369010680, false);
        writer.writeInt(this.offset);
        writer.writeInt(this.length);
        writer.writeLargeInt(this.documentId, 64);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): MessageEntityCustomEmoji {
        const args: any = {};
        const _offset = reader.readInt();
        args.offset = _offset;
        const _length = reader.readInt();
        args.length = _length;
        const _documentId = reader.readLargeInt(64);
        args.documentId = _documentId;
        return new MessageEntityCustomEmoji(args);
    }
}