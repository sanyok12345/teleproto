import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { MTProtoRequest } from "../MTProtoRequest";
import { TypeSet_client_DH_params_answer } from "../types/TypeSet_client_DH_params_answer";

export class SetClientDHParams extends MTProtoRequest {
    static CONSTRUCTOR_ID = 4110704415;
    static SUBCLASS_OF_ID = 1440574683;
    static className = "SetClientDHParams";
    static classType = "request";

    nonce!: bigint;
    serverNonce!: bigint;
    encryptedData!: Buffer;

    constructor(args: { nonce?: bigint, serverNonce?: bigint, encryptedData?: Buffer } = {}) {
        super();
        this.nonce = args.nonce!;
        this.serverNonce = args.serverNonce!;
        this.encryptedData = args.encryptedData!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(4110704415, false);
        writer.writeLargeInt(this.nonce, 128);
        writer.writeLargeInt(this.serverNonce, 128);
        writer.tgWriteBytes(this.encryptedData);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeSet_client_DH_params_answer {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): SetClientDHParams {
        const args: any = {};
        const _nonce = reader.readLargeInt(128);
        args.nonce = _nonce;
        const _serverNonce = reader.readLargeInt(128);
        args.serverNonce = _serverNonce;
        const _encryptedData = reader.tgReadBytes();
        args.encryptedData = _encryptedData;
        return new SetClientDHParams(args);
    }
}