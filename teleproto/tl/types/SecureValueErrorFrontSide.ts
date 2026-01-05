import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeSecureValueType } from "./TypeSecureValueType";

export class SecureValueErrorFrontSide extends TLObject {
    static CONSTRUCTOR_ID = 12467706;
    static SUBCLASS_OF_ID = 101146574;
    static className = "SecureValueErrorFrontSide";
    static classType = "constructor";

    type!: TypeSecureValueType;
    fileHash!: Buffer;
    text!: string;

    constructor(args: { type?: TypeSecureValueType, fileHash?: Buffer, text?: string } = {}) {
        super();
        this.type = args.type!;
        this.fileHash = args.fileHash!;
        this.text = args.text!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(12467706, false);
        writer.write(this.type.getBytes());
        writer.tgWriteBytes(this.fileHash);
        writer.tgWriteString(this.text);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): SecureValueErrorFrontSide {
        const args: any = {};
        const _type = reader.tgReadObject();
        args.type = _type;
        const _fileHash = reader.tgReadBytes();
        args.fileHash = _fileHash;
        const _text = reader.tgReadString();
        args.text = _text;
        return new SecureValueErrorFrontSide(args);
    }
}