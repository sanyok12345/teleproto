import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";

export class DeleteChat extends MTProtoRequest {
    static CONSTRUCTOR_ID = 1540419152;
    static SUBCLASS_OF_ID = 4122188204;
    static className = "messages.DeleteChat";
    static classType = "request";

    chatId!: bigint;

    constructor(args: { chatId?: bigint } = {}) {
        super();
        this.chatId = args.chatId!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1540419152, false);
        writer.writeLargeInt(this.chatId, 64);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): boolean {
        const result = reader.tgReadBool();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): DeleteChat {
        const args: any = {};
        const _chatId = reader.readLargeInt(64);
        args.chatId = _chatId;
        return new DeleteChat(args);
    }
}