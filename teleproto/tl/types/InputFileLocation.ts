import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class InputFileLocation extends TLObject {
    static CONSTRUCTOR_ID = 3755650017;
    static SUBCLASS_OF_ID = 354669666;
    static className = "InputFileLocation";
    static classType = "constructor";

    volumeId!: bigint;
    localId!: number;
    secret!: bigint;
    fileReference!: Buffer;

    constructor(args: { volumeId?: bigint, localId?: number, secret?: bigint, fileReference?: Buffer } = {}) {
        super();
        this.volumeId = args.volumeId!;
        this.localId = args.localId!;
        this.secret = args.secret!;
        this.fileReference = args.fileReference!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3755650017, false);
        writer.writeLargeInt(this.volumeId, 64);
        writer.writeInt(this.localId);
        writer.writeLargeInt(this.secret, 64);
        writer.tgWriteBytes(this.fileReference);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputFileLocation {
        const args: any = {};
        const _volumeId = reader.readLargeInt(64);
        args.volumeId = _volumeId;
        const _localId = reader.readInt();
        args.localId = _localId;
        const _secret = reader.readLargeInt(64);
        args.secret = _secret;
        const _fileReference = reader.tgReadBytes();
        args.fileReference = _fileReference;
        return new InputFileLocation(args);
    }
}