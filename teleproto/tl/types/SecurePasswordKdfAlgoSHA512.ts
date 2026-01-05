import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class SecurePasswordKdfAlgoSHA512 extends TLObject {
    static CONSTRUCTOR_ID = 2252807570;
    static SUBCLASS_OF_ID = 1998989635;
    static className = "SecurePasswordKdfAlgoSHA512";
    static classType = "constructor";

    salt!: Buffer;

    constructor(args: { salt?: Buffer } = {}) {
        super();
        this.salt = args.salt!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2252807570, false);
        writer.tgWriteBytes(this.salt);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): SecurePasswordKdfAlgoSHA512 {
        const args: any = {};
        const _salt = reader.tgReadBytes();
        args.salt = _salt;
        return new SecurePasswordKdfAlgoSHA512(args);
    }
}