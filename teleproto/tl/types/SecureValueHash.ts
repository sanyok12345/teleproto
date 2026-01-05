import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeSecureValueType } from "./TypeSecureValueType";

export class SecureValueHash extends TLObject {
    static CONSTRUCTOR_ID = 3978218928;
    static SUBCLASS_OF_ID = 3589652487;
    static className = "SecureValueHash";
    static classType = "constructor";

    type!: TypeSecureValueType;
    hash!: Buffer;

    constructor(args: { type?: TypeSecureValueType, hash?: Buffer } = {}) {
        super();
        this.type = args.type!;
        this.hash = args.hash!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3978218928, false);
        writer.write(this.type.getBytes());
        writer.tgWriteBytes(this.hash);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): SecureValueHash {
        const args: any = {};
        const _type = reader.tgReadObject();
        args.type = _type;
        const _hash = reader.tgReadBytes();
        args.hash = _hash;
        return new SecureValueHash(args);
    }
}