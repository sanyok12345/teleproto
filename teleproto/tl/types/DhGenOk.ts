import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class DhGenOk extends TLObject {
    static CONSTRUCTOR_ID = 1003222836;
    static SUBCLASS_OF_ID = 1440574683;
    static className = "DhGenOk";
    static classType = "constructor";

    nonce!: bigint;
    serverNonce!: bigint;
    newNonceHash1!: bigint;

    constructor(args: { nonce?: bigint, serverNonce?: bigint, newNonceHash1?: bigint } = {}) {
        super();
        this.nonce = args.nonce!;
        this.serverNonce = args.serverNonce!;
        this.newNonceHash1 = args.newNonceHash1!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1003222836, false);
        writer.writeLargeInt(this.nonce, 128);
        writer.writeLargeInt(this.serverNonce, 128);
        writer.writeLargeInt(this.newNonceHash1, 128);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): DhGenOk {
        const args: any = {};
        const _nonce = reader.readLargeInt(128);
        args.nonce = _nonce;
        const _serverNonce = reader.readLargeInt(128);
        args.serverNonce = _serverNonce;
        const _newNonceHash1 = reader.readLargeInt(128);
        args.newNonceHash1 = _newNonceHash1;
        return new DhGenOk(args);
    }
}