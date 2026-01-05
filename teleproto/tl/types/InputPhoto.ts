import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class InputPhoto extends TLObject {
    static CONSTRUCTOR_ID = 1001634122;
    static SUBCLASS_OF_ID = 2221106144;
    static className = "InputPhoto";
    static classType = "constructor";

    id!: bigint;
    accessHash!: bigint;
    fileReference!: Buffer;

    constructor(args: { id?: bigint, accessHash?: bigint, fileReference?: Buffer } = {}) {
        super();
        this.id = args.id!;
        this.accessHash = args.accessHash!;
        this.fileReference = args.fileReference!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1001634122, false);
        writer.writeLargeInt(this.id, 64);
        writer.writeLargeInt(this.accessHash, 64);
        writer.tgWriteBytes(this.fileReference);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputPhoto {
        const args: any = {};
        const _id = reader.readLargeInt(64);
        args.id = _id;
        const _accessHash = reader.readLargeInt(64);
        args.accessHash = _accessHash;
        const _fileReference = reader.tgReadBytes();
        args.fileReference = _fileReference;
        return new InputPhoto(args);
    }
}