import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { MTProtoRequest } from "../MTProtoRequest";
import { TypeServer_DH_Params } from "../types/TypeServer_DH_Params";

export class ReqDHParams extends MTProtoRequest {
    static CONSTRUCTOR_ID = 3608339646;
    static SUBCLASS_OF_ID = 2786626974;
    static className = "ReqDHParams";
    static classType = "request";

    nonce!: bigint;
    serverNonce!: bigint;
    p!: Buffer;
    q!: Buffer;
    publicKeyFingerprint!: bigint;
    encryptedData!: Buffer;

    constructor(args: { nonce?: bigint, serverNonce?: bigint, p?: Buffer, q?: Buffer, publicKeyFingerprint?: bigint, encryptedData?: Buffer } = {}) {
        super();
        this.nonce = args.nonce!;
        this.serverNonce = args.serverNonce!;
        this.p = args.p!;
        this.q = args.q!;
        this.publicKeyFingerprint = args.publicKeyFingerprint!;
        this.encryptedData = args.encryptedData!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3608339646, false);
        writer.writeLargeInt(this.nonce, 128);
        writer.writeLargeInt(this.serverNonce, 128);
        writer.tgWriteBytes(this.p);
        writer.tgWriteBytes(this.q);
        writer.writeLargeInt(this.publicKeyFingerprint, 64);
        writer.tgWriteBytes(this.encryptedData);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeServer_DH_Params {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): ReqDHParams {
        const args: any = {};
        const _nonce = reader.readLargeInt(128);
        args.nonce = _nonce;
        const _serverNonce = reader.readLargeInt(128);
        args.serverNonce = _serverNonce;
        const _p = reader.tgReadBytes();
        args.p = _p;
        const _q = reader.tgReadBytes();
        args.q = _q;
        const _publicKeyFingerprint = reader.readLargeInt(64);
        args.publicKeyFingerprint = _publicKeyFingerprint;
        const _encryptedData = reader.tgReadBytes();
        args.encryptedData = _encryptedData;
        return new ReqDHParams(args);
    }
}