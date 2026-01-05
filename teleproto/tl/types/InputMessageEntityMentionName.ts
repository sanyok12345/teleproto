import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeInputUser } from "./TypeInputUser";

export class InputMessageEntityMentionName extends TLObject {
    static CONSTRUCTOR_ID = 546203849;
    static SUBCLASS_OF_ID = 3479443932;
    static className = "InputMessageEntityMentionName";
    static classType = "constructor";

    offset!: number;
    length!: number;
    userId!: TypeInputUser;

    constructor(args: { offset?: number, length?: number, userId?: TypeInputUser } = {}) {
        super();
        this.offset = args.offset!;
        this.length = args.length!;
        this.userId = args.userId!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(546203849, false);
        writer.writeInt(this.offset);
        writer.writeInt(this.length);
        writer.write(this.userId.getBytes());
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputMessageEntityMentionName {
        const args: any = {};
        const _offset = reader.readInt();
        args.offset = _offset;
        const _length = reader.readInt();
        args.length = _length;
        const _userId = reader.tgReadObject();
        args.userId = _userId;
        return new InputMessageEntityMentionName(args);
    }
}