import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class UpdateUserPhone extends TLObject {
    static CONSTRUCTOR_ID = 88680979;
    static SUBCLASS_OF_ID = 2676568142;
    static className = "UpdateUserPhone";
    static classType = "constructor";

    userId!: bigint;
    phone!: string;

    constructor(args: { userId?: bigint, phone?: string } = {}) {
        super();
        this.userId = args.userId!;
        this.phone = args.phone!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(88680979, false);
        writer.writeLargeInt(this.userId, 64);
        writer.tgWriteString(this.phone);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): UpdateUserPhone {
        const args: any = {};
        const _userId = reader.readLargeInt(64);
        args.userId = _userId;
        const _phone = reader.tgReadString();
        args.phone = _phone;
        return new UpdateUserPhone(args);
    }
}