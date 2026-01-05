import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class DhGenRetry extends TLObject {
    static CONSTRUCTOR_ID = 1188831161;
    static SUBCLASS_OF_ID = 1440574683;
    static className = "DhGenRetry";
    static classType = "constructor";

    nonce!: bigint;
    serverNonce!: bigint;
    newNonceHash2!: bigint;

    constructor(args: { nonce?: bigint, serverNonce?: bigint, newNonceHash2?: bigint } = {}) {
        super();
        this.nonce = args.nonce!;
        this.serverNonce = args.serverNonce!;
        this.newNonceHash2 = args.newNonceHash2!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1188831161, false);
        writer.writeLargeInt(this.nonce, 128);
        writer.writeLargeInt(this.serverNonce, 128);
        writer.writeLargeInt(this.newNonceHash2, 128);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): DhGenRetry {
        const args: any = {};
        const _nonce = reader.readLargeInt(128);
        args.nonce = _nonce;
        const _serverNonce = reader.readLargeInt(128);
        args.serverNonce = _serverNonce;
        const _newNonceHash2 = reader.readLargeInt(128);
        args.newNonceHash2 = _newNonceHash2;
        return new DhGenRetry(args);
    }
}