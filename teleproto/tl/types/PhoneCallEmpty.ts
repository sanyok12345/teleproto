import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class PhoneCallEmpty extends TLObject {
    static CONSTRUCTOR_ID = 1399245077;
    static SUBCLASS_OF_ID = 3296664529;
    static className = "PhoneCallEmpty";
    static classType = "constructor";

    id!: bigint;

    constructor(args: { id?: bigint } = {}) {
        super();
        this.id = args.id!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1399245077, false);
        writer.writeLargeInt(this.id, 64);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): PhoneCallEmpty {
        const args: any = {};
        const _id = reader.readLargeInt(64);
        args.id = _id;
        return new PhoneCallEmpty(args);
    }
}