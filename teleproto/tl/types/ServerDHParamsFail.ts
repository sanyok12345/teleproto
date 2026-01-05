import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class ServerDHParamsFail extends TLObject {
    static CONSTRUCTOR_ID = 2043348061;
    static SUBCLASS_OF_ID = 2786626974;
    static className = "ServerDHParamsFail";
    static classType = "constructor";

    nonce!: bigint;
    serverNonce!: bigint;
    newNonceHash!: bigint;

    constructor(args: { nonce?: bigint, serverNonce?: bigint, newNonceHash?: bigint } = {}) {
        super();
        this.nonce = args.nonce!;
        this.serverNonce = args.serverNonce!;
        this.newNonceHash = args.newNonceHash!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2043348061, false);
        writer.writeLargeInt(this.nonce, 128);
        writer.writeLargeInt(this.serverNonce, 128);
        writer.writeLargeInt(this.newNonceHash, 128);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): ServerDHParamsFail {
        const args: any = {};
        const _nonce = reader.readLargeInt(128);
        args.nonce = _nonce;
        const _serverNonce = reader.readLargeInt(128);
        args.serverNonce = _serverNonce;
        const _newNonceHash = reader.readLargeInt(128);
        args.newNonceHash = _newNonceHash;
        return new ServerDHParamsFail(args);
    }
}