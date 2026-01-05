import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class UpdateEncryptedChatTyping extends TLObject {
    static CONSTRUCTOR_ID = 386986326;
    static SUBCLASS_OF_ID = 2676568142;
    static className = "UpdateEncryptedChatTyping";
    static classType = "constructor";

    chatId!: number;

    constructor(args: { chatId?: number } = {}) {
        super();
        this.chatId = args.chatId!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(386986326, false);
        writer.writeInt(this.chatId);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): UpdateEncryptedChatTyping {
        const args: any = {};
        const _chatId = reader.readInt();
        args.chatId = _chatId;
        return new UpdateEncryptedChatTyping(args);
    }
}