import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class MessageEntityMentionName extends TLObject {
    static CONSTRUCTOR_ID = 3699052864;
    static SUBCLASS_OF_ID = 3479443932;
    static className = "MessageEntityMentionName";
    static classType = "constructor";

    offset!: number;
    length!: number;
    userId!: bigint;

    constructor(args: { offset?: number, length?: number, userId?: bigint } = {}) {
        super();
        this.offset = args.offset!;
        this.length = args.length!;
        this.userId = args.userId!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3699052864, false);
        writer.writeInt(this.offset);
        writer.writeInt(this.length);
        writer.writeLargeInt(this.userId, 64);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): MessageEntityMentionName {
        const args: any = {};
        const _offset = reader.readInt();
        args.offset = _offset;
        const _length = reader.readInt();
        args.length = _length;
        const _userId = reader.readLargeInt(64);
        args.userId = _userId;
        return new MessageEntityMentionName(args);
    }
}