import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class SecurePasswordKdfAlgoPBKDF2HMACSHA512iter100000 extends TLObject {
    static CONSTRUCTOR_ID = 3153255840;
    static SUBCLASS_OF_ID = 1998989635;
    static className = "SecurePasswordKdfAlgoPBKDF2HMACSHA512iter100000";
    static classType = "constructor";

    salt!: Buffer;

    constructor(args: { salt?: Buffer } = {}) {
        super();
        this.salt = args.salt!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3153255840, false);
        writer.tgWriteBytes(this.salt);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): SecurePasswordKdfAlgoPBKDF2HMACSHA512iter100000 {
        const args: any = {};
        const _salt = reader.tgReadBytes();
        args.salt = _salt;
        return new SecurePasswordKdfAlgoPBKDF2HMACSHA512iter100000(args);
    }
}