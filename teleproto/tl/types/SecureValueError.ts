import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeSecureValueType } from "./TypeSecureValueType";

export class SecureValueError extends TLObject {
    static CONSTRUCTOR_ID = 2258466191;
    static SUBCLASS_OF_ID = 101146574;
    static className = "SecureValueError";
    static classType = "constructor";

    type!: TypeSecureValueType;
    hash!: Buffer;
    text!: string;

    constructor(args: { type?: TypeSecureValueType, hash?: Buffer, text?: string } = {}) {
        super();
        this.type = args.type!;
        this.hash = args.hash!;
        this.text = args.text!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2258466191, false);
        writer.write(this.type.getBytes());
        writer.tgWriteBytes(this.hash);
        writer.tgWriteString(this.text);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): SecureValueError {
        const args: any = {};
        const _type = reader.tgReadObject();
        args.type = _type;
        const _hash = reader.tgReadBytes();
        args.hash = _hash;
        const _text = reader.tgReadString();
        args.text = _text;
        return new SecureValueError(args);
    }
}