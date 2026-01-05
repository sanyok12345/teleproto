import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class InputPhotoFileLocation extends TLObject {
    static CONSTRUCTOR_ID = 1075322878;
    static SUBCLASS_OF_ID = 354669666;
    static className = "InputPhotoFileLocation";
    static classType = "constructor";

    id!: bigint;
    accessHash!: bigint;
    fileReference!: Buffer;
    thumbSize!: string;

    constructor(args: { id?: bigint, accessHash?: bigint, fileReference?: Buffer, thumbSize?: string } = {}) {
        super();
        this.id = args.id!;
        this.accessHash = args.accessHash!;
        this.fileReference = args.fileReference!;
        this.thumbSize = args.thumbSize!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1075322878, false);
        writer.writeLargeInt(this.id, 64);
        writer.writeLargeInt(this.accessHash, 64);
        writer.tgWriteBytes(this.fileReference);
        writer.tgWriteString(this.thumbSize);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputPhotoFileLocation {
        const args: any = {};
        const _id = reader.readLargeInt(64);
        args.id = _id;
        const _accessHash = reader.readLargeInt(64);
        args.accessHash = _accessHash;
        const _fileReference = reader.tgReadBytes();
        args.fileReference = _fileReference;
        const _thumbSize = reader.tgReadString();
        args.thumbSize = _thumbSize;
        return new InputPhotoFileLocation(args);
    }
}