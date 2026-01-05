import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class PhotoEmpty extends TLObject {
    static CONSTRUCTOR_ID = 590459437;
    static SUBCLASS_OF_ID = 3581324060;
    static className = "PhotoEmpty";
    static classType = "constructor";

    id!: bigint;

    constructor(args: { id?: bigint } = {}) {
        super();
        this.id = args.id!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(590459437, false);
        writer.writeLargeInt(this.id, 64);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): PhotoEmpty {
        const args: any = {};
        const _id = reader.readLargeInt(64);
        args.id = _id;
        return new PhotoEmpty(args);
    }
}