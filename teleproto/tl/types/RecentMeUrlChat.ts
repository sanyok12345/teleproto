import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class RecentMeUrlChat extends TLObject {
    static CONSTRUCTOR_ID = 3000660434;
    static SUBCLASS_OF_ID = 1436889209;
    static className = "RecentMeUrlChat";
    static classType = "constructor";

    url!: string;
    chatId!: bigint;

    constructor(args: { url?: string, chatId?: bigint } = {}) {
        super();
        this.url = args.url!;
        this.chatId = args.chatId!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3000660434, false);
        writer.tgWriteString(this.url);
        writer.writeLargeInt(this.chatId, 64);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): RecentMeUrlChat {
        const args: any = {};
        const _url = reader.tgReadString();
        args.url = _url;
        const _chatId = reader.readLargeInt(64);
        args.chatId = _chatId;
        return new RecentMeUrlChat(args);
    }
}