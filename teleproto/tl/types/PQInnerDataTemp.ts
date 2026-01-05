import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class PQInnerDataTemp extends TLObject {
    static CONSTRUCTOR_ID = 1013613780;
    static SUBCLASS_OF_ID = 1097864055;
    static className = "PQInnerDataTemp";
    static classType = "constructor";

    pq!: Buffer;
    p!: Buffer;
    q!: Buffer;
    nonce!: bigint;
    serverNonce!: bigint;
    newNonce!: bigint;
    expiresIn!: number;

    constructor(args: { pq?: Buffer, p?: Buffer, q?: Buffer, nonce?: bigint, serverNonce?: bigint, newNonce?: bigint, expiresIn?: number } = {}) {
        super();
        this.pq = args.pq!;
        this.p = args.p!;
        this.q = args.q!;
        this.nonce = args.nonce!;
        this.serverNonce = args.serverNonce!;
        this.newNonce = args.newNonce!;
        this.expiresIn = args.expiresIn!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1013613780, false);
        writer.tgWriteBytes(this.pq);
        writer.tgWriteBytes(this.p);
        writer.tgWriteBytes(this.q);
        writer.writeLargeInt(this.nonce, 128);
        writer.writeLargeInt(this.serverNonce, 128);
        writer.writeLargeInt(this.newNonce, 256);
        writer.writeInt(this.expiresIn);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): PQInnerDataTemp {
        const args: any = {};
        const _pq = reader.tgReadBytes();
        args.pq = _pq;
        const _p = reader.tgReadBytes();
        args.p = _p;
        const _q = reader.tgReadBytes();
        args.q = _q;
        const _nonce = reader.readLargeInt(128);
        args.nonce = _nonce;
        const _serverNonce = reader.readLargeInt(128);
        args.serverNonce = _serverNonce;
        const _newNonce = reader.readLargeInt(256);
        args.newNonce = _newNonce;
        const _expiresIn = reader.readInt();
        args.expiresIn = _expiresIn;
        return new PQInnerDataTemp(args);
    }
}