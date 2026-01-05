import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class UpdateUser extends TLObject {
    static CONSTRUCTOR_ID = 542282808;
    static SUBCLASS_OF_ID = 2676568142;
    static className = "UpdateUser";
    static classType = "constructor";

    userId!: bigint;

    constructor(args: { userId?: bigint } = {}) {
        super();
        this.userId = args.userId!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(542282808, false);
        writer.writeLargeInt(this.userId, 64);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): UpdateUser {
        const args: any = {};
        const _userId = reader.readLargeInt(64);
        args.userId = _userId;
        return new UpdateUser(args);
    }
}