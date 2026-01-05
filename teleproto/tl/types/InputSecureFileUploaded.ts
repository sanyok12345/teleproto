import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class InputSecureFileUploaded extends TLObject {
    static CONSTRUCTOR_ID = 859091184;
    static SUBCLASS_OF_ID = 3670584828;
    static className = "InputSecureFileUploaded";
    static classType = "constructor";

    id!: bigint;
    parts!: number;
    md5Checksum!: string;
    fileHash!: Buffer;
    secret!: Buffer;

    constructor(args: { id?: bigint, parts?: number, md5Checksum?: string, fileHash?: Buffer, secret?: Buffer } = {}) {
        super();
        this.id = args.id!;
        this.parts = args.parts!;
        this.md5Checksum = args.md5Checksum!;
        this.fileHash = args.fileHash!;
        this.secret = args.secret!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(859091184, false);
        writer.writeLargeInt(this.id, 64);
        writer.writeInt(this.parts);
        writer.tgWriteString(this.md5Checksum);
        writer.tgWriteBytes(this.fileHash);
        writer.tgWriteBytes(this.secret);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputSecureFileUploaded {
        const args: any = {};
        const _id = reader.readLargeInt(64);
        args.id = _id;
        const _parts = reader.readInt();
        args.parts = _parts;
        const _md5Checksum = reader.tgReadString();
        args.md5Checksum = _md5Checksum;
        const _fileHash = reader.tgReadBytes();
        args.fileHash = _fileHash;
        const _secret = reader.tgReadBytes();
        args.secret = _secret;
        return new InputSecureFileUploaded(args);
    }
}