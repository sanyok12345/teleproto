import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class DocumentEmpty extends TLObject {
    static CONSTRUCTOR_ID = 922273905;
    static SUBCLASS_OF_ID = 555739168;
    static className = "DocumentEmpty";
    static classType = "constructor";

    id!: bigint;

    constructor(args: { id?: bigint } = {}) {
        super();
        this.id = args.id!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(922273905, false);
        writer.writeLargeInt(this.id, 64);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): DocumentEmpty {
        const args: any = {};
        const _id = reader.readLargeInt(64);
        args.id = _id;
        return new DocumentEmpty(args);
    }
}