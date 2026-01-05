import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class ClientDHInnerData extends TLObject {
    static CONSTRUCTOR_ID = 1715713620;
    static SUBCLASS_OF_ID = 4176408426;
    static className = "ClientDHInnerData";
    static classType = "constructor";

    nonce!: bigint;
    serverNonce!: bigint;
    retryId!: bigint;
    gB!: Buffer;

    constructor(args: { nonce?: bigint, serverNonce?: bigint, retryId?: bigint, gB?: Buffer } = {}) {
        super();
        this.nonce = args.nonce!;
        this.serverNonce = args.serverNonce!;
        this.retryId = args.retryId!;
        this.gB = args.gB!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1715713620, false);
        writer.writeLargeInt(this.nonce, 128);
        writer.writeLargeInt(this.serverNonce, 128);
        writer.writeLargeInt(this.retryId, 64);
        writer.tgWriteBytes(this.gB);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): ClientDHInnerData {
        const args: any = {};
        const _nonce = reader.readLargeInt(128);
        args.nonce = _nonce;
        const _serverNonce = reader.readLargeInt(128);
        args.serverNonce = _serverNonce;
        const _retryId = reader.readLargeInt(64);
        args.retryId = _retryId;
        const _gB = reader.tgReadBytes();
        args.gB = _gB;
        return new ClientDHInnerData(args);
    }
}