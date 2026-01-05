import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class InputEncryptedFileBigUploaded extends TLObject {
    static CONSTRUCTOR_ID = 767652808;
    static SUBCLASS_OF_ID = 2239021690;
    static className = "InputEncryptedFileBigUploaded";
    static classType = "constructor";

    id!: bigint;
    parts!: number;
    keyFingerprint!: number;

    constructor(args: { id?: bigint, parts?: number, keyFingerprint?: number } = {}) {
        super();
        this.id = args.id!;
        this.parts = args.parts!;
        this.keyFingerprint = args.keyFingerprint!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(767652808, false);
        writer.writeLargeInt(this.id, 64);
        writer.writeInt(this.parts);
        writer.writeInt(this.keyFingerprint);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputEncryptedFileBigUploaded {
        const args: any = {};
        const _id = reader.readLargeInt(64);
        args.id = _id;
        const _parts = reader.readInt();
        args.parts = _parts;
        const _keyFingerprint = reader.readInt();
        args.keyFingerprint = _keyFingerprint;
        return new InputEncryptedFileBigUploaded(args);
    }
}