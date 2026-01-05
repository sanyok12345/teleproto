import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class EncryptedFile extends TLObject {
    static CONSTRUCTOR_ID = 2818608344;
    static SUBCLASS_OF_ID = 2217371584;
    static className = "EncryptedFile";
    static classType = "constructor";

    id!: bigint;
    accessHash!: bigint;
    size!: bigint;
    dcId!: number;
    keyFingerprint!: number;

    constructor(args: { id?: bigint, accessHash?: bigint, size?: bigint, dcId?: number, keyFingerprint?: number } = {}) {
        super();
        this.id = args.id!;
        this.accessHash = args.accessHash!;
        this.size = args.size!;
        this.dcId = args.dcId!;
        this.keyFingerprint = args.keyFingerprint!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2818608344, false);
        writer.writeLargeInt(this.id, 64);
        writer.writeLargeInt(this.accessHash, 64);
        writer.writeLargeInt(this.size, 64);
        writer.writeInt(this.dcId);
        writer.writeInt(this.keyFingerprint);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): EncryptedFile {
        const args: any = {};
        const _id = reader.readLargeInt(64);
        args.id = _id;
        const _accessHash = reader.readLargeInt(64);
        args.accessHash = _accessHash;
        const _size = reader.readLargeInt(64);
        args.size = _size;
        const _dcId = reader.readInt();
        args.dcId = _dcId;
        const _keyFingerprint = reader.readInt();
        args.keyFingerprint = _keyFingerprint;
        return new EncryptedFile(args);
    }
}