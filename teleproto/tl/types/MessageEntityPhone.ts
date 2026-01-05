import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class MessageEntityPhone extends TLObject {
    static CONSTRUCTOR_ID = 2607407947;
    static SUBCLASS_OF_ID = 3479443932;
    static className = "MessageEntityPhone";
    static classType = "constructor";

    offset!: number;
    length!: number;

    constructor(args: { offset?: number, length?: number } = {}) {
        super();
        this.offset = args.offset!;
        this.length = args.length!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2607407947, false);
        writer.writeInt(this.offset);
        writer.writeInt(this.length);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): MessageEntityPhone {
        const args: any = {};
        const _offset = reader.readInt();
        args.offset = _offset;
        const _length = reader.readInt();
        args.length = _length;
        return new MessageEntityPhone(args);
    }
}