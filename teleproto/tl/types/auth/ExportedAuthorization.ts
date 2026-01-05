import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";

export class ExportedAuthorization extends TLObject {
    static CONSTRUCTOR_ID = 3023364792;
    static SUBCLASS_OF_ID = 1607593041;
    static className = "auth.ExportedAuthorization";
    static classType = "constructor";

    id!: bigint;
    bytes!: Buffer;

    constructor(args: { id?: bigint, bytes?: Buffer } = {}) {
        super();
        this.id = args.id!;
        this.bytes = args.bytes!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3023364792, false);
        writer.writeLargeInt(this.id, 64);
        writer.tgWriteBytes(this.bytes);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): ExportedAuthorization {
        const args: any = {};
        const _id = reader.readLargeInt(64);
        args.id = _id;
        const _bytes = reader.tgReadBytes();
        args.bytes = _bytes;
        return new ExportedAuthorization(args);
    }
}