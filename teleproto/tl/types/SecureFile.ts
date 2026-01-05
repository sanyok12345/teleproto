import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class SecureFile extends TLObject {
    static CONSTRUCTOR_ID = 2097791614;
    static SUBCLASS_OF_ID = 1572395975;
    static className = "SecureFile";
    static classType = "constructor";

    id!: bigint;
    accessHash!: bigint;
    size!: bigint;
    dcId!: number;
    date!: number;
    fileHash!: Buffer;
    secret!: Buffer;

    constructor(args: { id?: bigint, accessHash?: bigint, size?: bigint, dcId?: number, date?: number, fileHash?: Buffer, secret?: Buffer } = {}) {
        super();
        this.id = args.id!;
        this.accessHash = args.accessHash!;
        this.size = args.size!;
        this.dcId = args.dcId!;
        this.date = args.date!;
        this.fileHash = args.fileHash!;
        this.secret = args.secret!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2097791614, false);
        writer.writeLargeInt(this.id, 64);
        writer.writeLargeInt(this.accessHash, 64);
        writer.writeLargeInt(this.size, 64);
        writer.writeInt(this.dcId);
        writer.writeInt(this.date);
        writer.tgWriteBytes(this.fileHash);
        writer.tgWriteBytes(this.secret);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): SecureFile {
        const args: any = {};
        const _id = reader.readLargeInt(64);
        args.id = _id;
        const _accessHash = reader.readLargeInt(64);
        args.accessHash = _accessHash;
        const _size = reader.readLargeInt(64);
        args.size = _size;
        const _dcId = reader.readInt();
        args.dcId = _dcId;
        const _date = reader.readInt();
        args.date = _date;
        const _fileHash = reader.tgReadBytes();
        args.fileHash = _fileHash;
        const _secret = reader.tgReadBytes();
        args.secret = _secret;
        return new SecureFile(args);
    }
}