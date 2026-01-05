import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeSecurePasswordKdfAlgo } from "./TypeSecurePasswordKdfAlgo";

export class SecureSecretSettings extends TLObject {
    static CONSTRUCTOR_ID = 354925740;
    static SUBCLASS_OF_ID = 3334996731;
    static className = "SecureSecretSettings";
    static classType = "constructor";

    secureAlgo!: TypeSecurePasswordKdfAlgo;
    secureSecret!: Buffer;
    secureSecretId!: bigint;

    constructor(args: { secureAlgo?: TypeSecurePasswordKdfAlgo, secureSecret?: Buffer, secureSecretId?: bigint } = {}) {
        super();
        this.secureAlgo = args.secureAlgo!;
        this.secureSecret = args.secureSecret!;
        this.secureSecretId = args.secureSecretId!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(354925740, false);
        writer.write(this.secureAlgo.getBytes());
        writer.tgWriteBytes(this.secureSecret);
        writer.writeLargeInt(this.secureSecretId, 64);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): SecureSecretSettings {
        const args: any = {};
        const _secureAlgo = reader.tgReadObject();
        args.secureAlgo = _secureAlgo;
        const _secureSecret = reader.tgReadBytes();
        args.secureSecret = _secureSecret;
        const _secureSecretId = reader.readLargeInt(64);
        args.secureSecretId = _secureSecretId;
        return new SecureSecretSettings(args);
    }
}