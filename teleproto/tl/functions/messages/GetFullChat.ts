import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeChatFull } from "../../types/messages/TypeChatFull";

export class GetFullChat extends MTProtoRequest {
    static CONSTRUCTOR_ID = 2930772788;
    static SUBCLASS_OF_ID = 576344329;
    static className = "messages.GetFullChat";
    static classType = "request";

    chatId!: bigint;

    constructor(args: { chatId?: bigint } = {}) {
        super();
        this.chatId = args.chatId!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2930772788, false);
        writer.writeLargeInt(this.chatId, 64);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeChatFull {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetFullChat {
        const args: any = {};
        const _chatId = reader.readLargeInt(64);
        args.chatId = _chatId;
        return new GetFullChat(args);
    }
}