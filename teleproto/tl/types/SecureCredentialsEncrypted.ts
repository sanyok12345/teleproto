import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class SecureCredentialsEncrypted extends TLObject {
    static CONSTRUCTOR_ID = 871426631;
    static SUBCLASS_OF_ID = 2497476147;
    static className = "SecureCredentialsEncrypted";
    static classType = "constructor";

    data!: Buffer;
    hash!: Buffer;
    secret!: Buffer;

    constructor(args: { data?: Buffer, hash?: Buffer, secret?: Buffer } = {}) {
        super();
        this.data = args.data!;
        this.hash = args.hash!;
        this.secret = args.secret!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(871426631, false);
        writer.tgWriteBytes(this.data);
        writer.tgWriteBytes(this.hash);
        writer.tgWriteBytes(this.secret);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): SecureCredentialsEncrypted {
        const args: any = {};
        const _data = reader.tgReadBytes();
        args.data = _data;
        const _hash = reader.tgReadBytes();
        args.hash = _hash;
        const _secret = reader.tgReadBytes();
        args.secret = _secret;
        return new SecureCredentialsEncrypted(args);
    }
}