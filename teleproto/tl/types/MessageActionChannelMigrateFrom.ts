import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class MessageActionChannelMigrateFrom extends TLObject {
    static CONSTRUCTOR_ID = 3929622761;
    static SUBCLASS_OF_ID = 2256589094;
    static className = "MessageActionChannelMigrateFrom";
    static classType = "constructor";

    title!: string;
    chatId!: bigint;

    constructor(args: { title?: string, chatId?: bigint } = {}) {
        super();
        this.title = args.title!;
        this.chatId = args.chatId!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3929622761, false);
        writer.tgWriteString(this.title);
        writer.writeLargeInt(this.chatId, 64);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): MessageActionChannelMigrateFrom {
        const args: any = {};
        const _title = reader.tgReadString();
        args.title = _title;
        const _chatId = reader.readLargeInt(64);
        args.chatId = _chatId;
        return new MessageActionChannelMigrateFrom(args);
    }
}