import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class ServerDHParamsOk extends TLObject {
    static CONSTRUCTOR_ID = 3504867164;
    static SUBCLASS_OF_ID = 2786626974;
    static className = "ServerDHParamsOk";
    static classType = "constructor";

    nonce!: bigint;
    serverNonce!: bigint;
    encryptedAnswer!: Buffer;

    constructor(args: { nonce?: bigint, serverNonce?: bigint, encryptedAnswer?: Buffer } = {}) {
        super();
        this.nonce = args.nonce!;
        this.serverNonce = args.serverNonce!;
        this.encryptedAnswer = args.encryptedAnswer!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3504867164, false);
        writer.writeLargeInt(this.nonce, 128);
        writer.writeLargeInt(this.serverNonce, 128);
        writer.tgWriteBytes(this.encryptedAnswer);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): ServerDHParamsOk {
        const args: any = {};
        const _nonce = reader.readLargeInt(128);
        args.nonce = _nonce;
        const _serverNonce = reader.readLargeInt(128);
        args.serverNonce = _serverNonce;
        const _encryptedAnswer = reader.tgReadBytes();
        args.encryptedAnswer = _encryptedAnswer;
        return new ServerDHParamsOk(args);
    }
}