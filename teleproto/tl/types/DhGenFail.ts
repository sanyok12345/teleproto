import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class DhGenFail extends TLObject {
    static CONSTRUCTOR_ID = 2795351554;
    static SUBCLASS_OF_ID = 1440574683;
    static className = "DhGenFail";
    static classType = "constructor";

    nonce!: bigint;
    serverNonce!: bigint;
    newNonceHash3!: bigint;

    constructor(args: { nonce?: bigint, serverNonce?: bigint, newNonceHash3?: bigint } = {}) {
        super();
        this.nonce = args.nonce!;
        this.serverNonce = args.serverNonce!;
        this.newNonceHash3 = args.newNonceHash3!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2795351554, false);
        writer.writeLargeInt(this.nonce, 128);
        writer.writeLargeInt(this.serverNonce, 128);
        writer.writeLargeInt(this.newNonceHash3, 128);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): DhGenFail {
        const args: any = {};
        const _nonce = reader.readLargeInt(128);
        args.nonce = _nonce;
        const _serverNonce = reader.readLargeInt(128);
        args.serverNonce = _serverNonce;
        const _newNonceHash3 = reader.readLargeInt(128);
        args.newNonceHash3 = _newNonceHash3;
        return new DhGenFail(args);
    }
}