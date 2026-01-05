import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class ResPQ extends TLObject {
    static CONSTRUCTOR_ID = 85337187;
    static SUBCLASS_OF_ID = 2020181688;
    static className = "ResPQ";
    static classType = "constructor";

    nonce!: bigint;
    serverNonce!: bigint;
    pq!: Buffer;
    serverPublicKeyFingerprints!: bigint[];

    constructor(args: { nonce?: bigint, serverNonce?: bigint, pq?: Buffer, serverPublicKeyFingerprints?: bigint[] } = {}) {
        super();
        this.nonce = args.nonce!;
        this.serverNonce = args.serverNonce!;
        this.pq = args.pq!;
        this.serverPublicKeyFingerprints = args.serverPublicKeyFingerprints!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(85337187, false);
        writer.writeLargeInt(this.nonce, 128);
        writer.writeLargeInt(this.serverNonce, 128);
        writer.tgWriteBytes(this.pq);
        writer.writeVector(this.serverPublicKeyFingerprints, (item) => {
            writer.writeLargeInt(item, 64);
        });
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): ResPQ {
        const args: any = {};
        const _nonce = reader.readLargeInt(128);
        args.nonce = _nonce;
        const _serverNonce = reader.readLargeInt(128);
        args.serverNonce = _serverNonce;
        const _pq = reader.tgReadBytes();
        args.pq = _pq;
        const _serverPublicKeyFingerprints = reader.readVector((reader) => {
            const item = reader.readLargeInt(64);
            return item;
        });
        args.serverPublicKeyFingerprints = _serverPublicKeyFingerprints;
        return new ResPQ(args);
    }
}