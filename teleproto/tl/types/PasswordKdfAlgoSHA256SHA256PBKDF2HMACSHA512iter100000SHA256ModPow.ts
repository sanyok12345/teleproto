import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class PasswordKdfAlgoSHA256SHA256PBKDF2HMACSHA512iter100000SHA256ModPow extends TLObject {
    static CONSTRUCTOR_ID = 982592842;
    static SUBCLASS_OF_ID = 935130572;
    static className = "PasswordKdfAlgoSHA256SHA256PBKDF2HMACSHA512iter100000SHA256ModPow";
    static classType = "constructor";

    salt1!: Buffer;
    salt2!: Buffer;
    g!: number;
    p!: Buffer;

    constructor(args: { salt1?: Buffer, salt2?: Buffer, g?: number, p?: Buffer } = {}) {
        super();
        this.salt1 = args.salt1!;
        this.salt2 = args.salt2!;
        this.g = args.g!;
        this.p = args.p!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(982592842, false);
        writer.tgWriteBytes(this.salt1);
        writer.tgWriteBytes(this.salt2);
        writer.writeInt(this.g);
        writer.tgWriteBytes(this.p);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): PasswordKdfAlgoSHA256SHA256PBKDF2HMACSHA512iter100000SHA256ModPow {
        const args: any = {};
        const _salt1 = reader.tgReadBytes();
        args.salt1 = _salt1;
        const _salt2 = reader.tgReadBytes();
        args.salt2 = _salt2;
        const _g = reader.readInt();
        args.g = _g;
        const _p = reader.tgReadBytes();
        args.p = _p;
        return new PasswordKdfAlgoSHA256SHA256PBKDF2HMACSHA512iter100000SHA256ModPow(args);
    }
}