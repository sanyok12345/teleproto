import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class InputEncryptedFileUploaded extends TLObject {
    static CONSTRUCTOR_ID = 1690108678;
    static SUBCLASS_OF_ID = 2239021690;
    static className = "InputEncryptedFileUploaded";
    static classType = "constructor";

    id!: bigint;
    parts!: number;
    md5Checksum!: string;
    keyFingerprint!: number;

    constructor(args: { id?: bigint, parts?: number, md5Checksum?: string, keyFingerprint?: number } = {}) {
        super();
        this.id = args.id!;
        this.parts = args.parts!;
        this.md5Checksum = args.md5Checksum!;
        this.keyFingerprint = args.keyFingerprint!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1690108678, false);
        writer.writeLargeInt(this.id, 64);
        writer.writeInt(this.parts);
        writer.tgWriteString(this.md5Checksum);
        writer.writeInt(this.keyFingerprint);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputEncryptedFileUploaded {
        const args: any = {};
        const _id = reader.readLargeInt(64);
        args.id = _id;
        const _parts = reader.readInt();
        args.parts = _parts;
        const _md5Checksum = reader.tgReadString();
        args.md5Checksum = _md5Checksum;
        const _keyFingerprint = reader.readInt();
        args.keyFingerprint = _keyFingerprint;
        return new InputEncryptedFileUploaded(args);
    }
}