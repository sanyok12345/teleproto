import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class InputPhotoLegacyFileLocation extends TLObject {
    static CONSTRUCTOR_ID = 3627312883;
    static SUBCLASS_OF_ID = 354669666;
    static className = "InputPhotoLegacyFileLocation";
    static classType = "constructor";

    id!: bigint;
    accessHash!: bigint;
    fileReference!: Buffer;
    volumeId!: bigint;
    localId!: number;
    secret!: bigint;

    constructor(args: { id?: bigint, accessHash?: bigint, fileReference?: Buffer, volumeId?: bigint, localId?: number, secret?: bigint } = {}) {
        super();
        this.id = args.id!;
        this.accessHash = args.accessHash!;
        this.fileReference = args.fileReference!;
        this.volumeId = args.volumeId!;
        this.localId = args.localId!;
        this.secret = args.secret!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3627312883, false);
        writer.writeLargeInt(this.id, 64);
        writer.writeLargeInt(this.accessHash, 64);
        writer.tgWriteBytes(this.fileReference);
        writer.writeLargeInt(this.volumeId, 64);
        writer.writeInt(this.localId);
        writer.writeLargeInt(this.secret, 64);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputPhotoLegacyFileLocation {
        const args: any = {};
        const _id = reader.readLargeInt(64);
        args.id = _id;
        const _accessHash = reader.readLargeInt(64);
        args.accessHash = _accessHash;
        const _fileReference = reader.tgReadBytes();
        args.fileReference = _fileReference;
        const _volumeId = reader.readLargeInt(64);
        args.volumeId = _volumeId;
        const _localId = reader.readInt();
        args.localId = _localId;
        const _secret = reader.readLargeInt(64);
        args.secret = _secret;
        return new InputPhotoLegacyFileLocation(args);
    }
}