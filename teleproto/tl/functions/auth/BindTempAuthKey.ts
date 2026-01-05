import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";

export class BindTempAuthKey extends MTProtoRequest {
    static CONSTRUCTOR_ID = 3453233669;
    static SUBCLASS_OF_ID = 4122188204;
    static className = "auth.BindTempAuthKey";
    static classType = "request";

    permAuthKeyId!: bigint;
    nonce!: bigint;
    expiresAt!: number;
    encryptedMessage!: Buffer;

    constructor(args: { permAuthKeyId?: bigint, nonce?: bigint, expiresAt?: number, encryptedMessage?: Buffer } = {}) {
        super();
        this.permAuthKeyId = args.permAuthKeyId!;
        this.nonce = args.nonce!;
        this.expiresAt = args.expiresAt!;
        this.encryptedMessage = args.encryptedMessage!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3453233669, false);
        writer.writeLargeInt(this.permAuthKeyId, 64);
        writer.writeLargeInt(this.nonce, 64);
        writer.writeInt(this.expiresAt);
        writer.tgWriteBytes(this.encryptedMessage);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): boolean {
        const result = reader.tgReadBool();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): BindTempAuthKey {
        const args: any = {};
        const _permAuthKeyId = reader.readLargeInt(64);
        args.permAuthKeyId = _permAuthKeyId;
        const _nonce = reader.readLargeInt(64);
        args.nonce = _nonce;
        const _expiresAt = reader.readInt();
        args.expiresAt = _expiresAt;
        const _encryptedMessage = reader.tgReadBytes();
        args.encryptedMessage = _encryptedMessage;
        return new BindTempAuthKey(args);
    }
}