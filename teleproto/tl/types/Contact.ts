import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class Contact extends TLObject {
    static CONSTRUCTOR_ID = 341499403;
    static SUBCLASS_OF_ID = 2212487076;
    static className = "Contact";
    static classType = "constructor";

    userId!: bigint;
    mutual!: boolean;

    constructor(args: { userId?: bigint, mutual?: boolean } = {}) {
        super();
        this.userId = args.userId!;
        this.mutual = args.mutual!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(341499403, false);
        writer.writeLargeInt(this.userId, 64);
        writer.tgWriteBool(this.mutual);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): Contact {
        const args: any = {};
        const _userId = reader.readLargeInt(64);
        args.userId = _userId;
        const _mutual = reader.tgReadBool();
        args.mutual = _mutual;
        return new Contact(args);
    }
}