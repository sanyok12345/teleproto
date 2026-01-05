import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class UserEmpty extends TLObject {
    static CONSTRUCTOR_ID = 3552332666;
    static SUBCLASS_OF_ID = 765557111;
    static className = "UserEmpty";
    static classType = "constructor";

    id!: bigint;

    constructor(args: { id?: bigint } = {}) {
        super();
        this.id = args.id!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3552332666, false);
        writer.writeLargeInt(this.id, 64);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): UserEmpty {
        const args: any = {};
        const _id = reader.readLargeInt(64);
        args.id = _id;
        return new UserEmpty(args);
    }
}