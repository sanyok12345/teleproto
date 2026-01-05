import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeSecureValueType } from "./TypeSecureValueType";

export class SecureValueErrorData extends TLObject {
    static CONSTRUCTOR_ID = 3903065049;
    static SUBCLASS_OF_ID = 101146574;
    static className = "SecureValueErrorData";
    static classType = "constructor";

    type!: TypeSecureValueType;
    dataHash!: Buffer;
    field!: string;
    text!: string;

    constructor(args: { type?: TypeSecureValueType, dataHash?: Buffer, field?: string, text?: string } = {}) {
        super();
        this.type = args.type!;
        this.dataHash = args.dataHash!;
        this.field = args.field!;
        this.text = args.text!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3903065049, false);
        writer.write(this.type.getBytes());
        writer.tgWriteBytes(this.dataHash);
        writer.tgWriteString(this.field);
        writer.tgWriteString(this.text);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): SecureValueErrorData {
        const args: any = {};
        const _type = reader.tgReadObject();
        args.type = _type;
        const _dataHash = reader.tgReadBytes();
        args.dataHash = _dataHash;
        const _field = reader.tgReadString();
        args.field = _field;
        const _text = reader.tgReadString();
        args.text = _text;
        return new SecureValueErrorData(args);
    }
}