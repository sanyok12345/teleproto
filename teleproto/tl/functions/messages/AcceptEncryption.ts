import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeInputEncryptedChat } from "../../types/TypeInputEncryptedChat";
import { TypeEncryptedChat } from "../../types/TypeEncryptedChat";

export class AcceptEncryption extends MTProtoRequest {
    static CONSTRUCTOR_ID = 1035731989;
    static SUBCLASS_OF_ID = 1831379834;
    static className = "messages.AcceptEncryption";
    static classType = "request";

    peer?: TypeInputEncryptedChat;
    gB!: Buffer;
    keyFingerprint!: bigint;

    constructor(args: { peer?: TypeInputEncryptedChat, gB?: Buffer, keyFingerprint?: bigint } = {}) {
        super();
        this.peer = args.peer;
        this.gB = args.gB!;
        this.keyFingerprint = args.keyFingerprint!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1035731989, false);
        writer.write(this.peer!.getBytes());
        writer.tgWriteBytes(this.gB);
        writer.writeLargeInt(this.keyFingerprint, 64);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeEncryptedChat {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): AcceptEncryption {
        const args: any = {};
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        const _gB = reader.tgReadBytes();
        args.gB = _gB;
        const _keyFingerprint = reader.readLargeInt(64);
        args.keyFingerprint = _keyFingerprint;
        return new AcceptEncryption(args);
    }
}