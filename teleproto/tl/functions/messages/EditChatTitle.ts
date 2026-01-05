import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeUpdates } from "../../types/TypeUpdates";

export class EditChatTitle extends MTProtoRequest {
    static CONSTRUCTOR_ID = 1937260541;
    static SUBCLASS_OF_ID = 2331323052;
    static className = "messages.EditChatTitle";
    static classType = "request";

    chatId!: bigint;
    title!: string;

    constructor(args: { chatId?: bigint, title?: string } = {}) {
        super();
        this.chatId = args.chatId!;
        this.title = args.title!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1937260541, false);
        writer.writeLargeInt(this.chatId, 64);
        writer.tgWriteString(this.title);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeUpdates {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): EditChatTitle {
        const args: any = {};
        const _chatId = reader.readLargeInt(64);
        args.chatId = _chatId;
        const _title = reader.tgReadString();
        args.title = _title;
        return new EditChatTitle(args);
    }
}