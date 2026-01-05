import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeInputEncryptedChat } from "../../types/TypeInputEncryptedChat";
import { TypeSentEncryptedMessage } from "../../types/messages/TypeSentEncryptedMessage";

export class SendEncryptedService extends MTProtoRequest {
    static CONSTRUCTOR_ID = 852769188;
    static SUBCLASS_OF_ID = 3382591056;
    static className = "messages.SendEncryptedService";
    static classType = "request";

    peer?: TypeInputEncryptedChat;
    randomId!: bigint;
    data!: Buffer;

    constructor(args: { peer?: TypeInputEncryptedChat, randomId?: bigint, data?: Buffer } = {}) {
        super();
        this.peer = args.peer;
        this.randomId = args.randomId!;
        this.data = args.data!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(852769188, false);
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

    static fromReader(reader: BinaryReader): SendEncryptedService {
        const args: any = {};
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        const _randomId = reader.readLargeInt(64);
        args.randomId = _randomId;
        const _data = reader.tgReadBytes();
        args.data = _data;
        return new SendEncryptedService(args);
    }
}