import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class ServerDHInnerData extends TLObject {
    static CONSTRUCTOR_ID = 3045658042;
    static SUBCLASS_OF_ID = 3332007868;
    static className = "ServerDHInnerData";
    static classType = "constructor";

    nonce!: bigint;
    serverNonce!: bigint;
    g!: number;
    dhPrime!: Buffer;
    gA!: Buffer;
    serverTime!: number;

    constructor(args: { nonce?: bigint, serverNonce?: bigint, g?: number, dhPrime?: Buffer, gA?: Buffer, serverTime?: number } = {}) {
        super();
        this.nonce = args.nonce!;
        this.serverNonce = args.serverNonce!;
        this.g = args.g!;
        this.dhPrime = args.dhPrime!;
        this.gA = args.gA!;
        this.serverTime = args.serverTime!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3045658042, false);
        writer.writeLargeInt(this.nonce, 128);
        writer.writeLargeInt(this.serverNonce, 128);
        writer.writeInt(this.g);
        writer.tgWriteBytes(this.dhPrime);
        writer.tgWriteBytes(this.gA);
        writer.writeInt(this.serverTime);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): ServerDHInnerData {
        const args: any = {};
        const _nonce = reader.readLargeInt(128);
        args.nonce = _nonce;
        const _serverNonce = reader.readLargeInt(128);
        args.serverNonce = _serverNonce;
        const _g = reader.readInt();
        args.g = _g;
        const _dhPrime = reader.tgReadBytes();
        args.dhPrime = _dhPrime;
        const _gA = reader.tgReadBytes();
        args.gA = _gA;
        const _serverTime = reader.readInt();
        args.serverTime = _serverTime;
        return new ServerDHInnerData(args);
    }
}