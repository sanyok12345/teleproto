import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class FutureSalt extends TLObject {
    static CONSTRUCTOR_ID = 155834844;
    static SUBCLASS_OF_ID = 1172651471;
    static className = "FutureSalt";
    static classType = "constructor";

    validSince!: number;
    validUntil!: number;
    salt!: bigint;

    constructor(args: { validSince?: number, validUntil?: number, salt?: bigint } = {}) {
        super();
        this.validSince = args.validSince!;
        this.validUntil = args.validUntil!;
        this.salt = args.salt!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(155834844, false);
        writer.writeInt(this.validSince);
        writer.writeInt(this.validUntil);
        writer.writeLargeInt(this.salt, 64);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): FutureSalt {
        const args: any = {};
        const _validSince = reader.readInt();
        args.validSince = _validSince;
        const _validUntil = reader.readInt();
        args.validUntil = _validUntil;
        const _salt = reader.readLargeInt(64);
        args.salt = _salt;
        return new FutureSalt(args);
    }
}