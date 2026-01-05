import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class BindAuthKeyInner extends TLObject {
    static CONSTRUCTOR_ID = 1973679973;
    static SUBCLASS_OF_ID = 789156209;
    static className = "BindAuthKeyInner";
    static classType = "constructor";

    nonce!: bigint;
    tempAuthKeyId!: bigint;
    permAuthKeyId!: bigint;
    tempSessionId!: bigint;
    expiresAt!: number;

    constructor(args: { nonce?: bigint, tempAuthKeyId?: bigint, permAuthKeyId?: bigint, tempSessionId?: bigint, expiresAt?: number } = {}) {
        super();
        this.nonce = args.nonce!;
        this.tempAuthKeyId = args.tempAuthKeyId!;
        this.permAuthKeyId = args.permAuthKeyId!;
        this.tempSessionId = args.tempSessionId!;
        this.expiresAt = args.expiresAt!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1973679973, false);
        writer.writeLargeInt(this.nonce, 64);
        writer.writeLargeInt(this.tempAuthKeyId, 64);
        writer.writeLargeInt(this.permAuthKeyId, 64);
        writer.writeLargeInt(this.tempSessionId, 64);
        writer.writeInt(this.expiresAt);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): BindAuthKeyInner {
        const args: any = {};
        const _nonce = reader.readLargeInt(64);
        args.nonce = _nonce;
        const _tempAuthKeyId = reader.readLargeInt(64);
        args.tempAuthKeyId = _tempAuthKeyId;
        const _permAuthKeyId = reader.readLargeInt(64);
        args.permAuthKeyId = _permAuthKeyId;
        const _tempSessionId = reader.readLargeInt(64);
        args.tempSessionId = _tempSessionId;
        const _expiresAt = reader.readInt();
        args.expiresAt = _expiresAt;
        return new BindAuthKeyInner(args);
    }
}