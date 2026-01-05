import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class UpdateChat extends TLObject {
    static CONSTRUCTOR_ID = 4170869326;
    static SUBCLASS_OF_ID = 2676568142;
    static className = "UpdateChat";
    static classType = "constructor";

    chatId!: bigint;

    constructor(args: { chatId?: bigint } = {}) {
        super();
        this.chatId = args.chatId!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(4170869326, false);
        writer.writeLargeInt(this.chatId, 64);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): UpdateChat {
        const args: any = {};
        const _chatId = reader.readLargeInt(64);
        args.chatId = _chatId;
        return new UpdateChat(args);
    }
}