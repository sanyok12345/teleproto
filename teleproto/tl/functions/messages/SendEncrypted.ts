import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeInputEncryptedChat } from "../../types/TypeInputEncryptedChat";
import { TypeSentEncryptedMessage } from "../../types/messages/TypeSentEncryptedMessage";

export class SendEncrypted extends MTProtoRequest {
    static CONSTRUCTOR_ID = 1157265941;
    static SUBCLASS_OF_ID = 3382591056;
    static className = "messages.SendEncrypted";
    static classType = "request";

    flags?: number;
    silent?: boolean;
    peer?: TypeInputEncryptedChat;
    randomId!: bigint;
    data!: Buffer;

    constructor(args: { flags?: number, silent?: boolean, peer?: TypeInputEncryptedChat, randomId?: bigint, data?: Buffer } = {}) {
        super();
        this.flags = args.flags;
        this.silent = args.silent;
        this.peer = args.peer;
        this.randomId = args.randomId!;
        this.data = args.data!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1157265941, false);
        let flags = 0;
        if (this.silent) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        if (this.silent !== undefined && this.silent !== null) {
        }
        writer.write(this.peer!.getBytes());
        writer.writeLargeInt(this.randomId, 64);
        writer.tgWriteBytes(this.data);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeSentEncryptedMessage {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): SendEncrypted {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _silent = true;
            args.silent = _silent;
        } else {
            args.silent = false;
        }
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        const _randomId = reader.readLargeInt(64);
        args.randomId = _randomId;
        const _data = reader.tgReadBytes();
        args.data = _data;
        return new SendEncrypted(args);
    }
}