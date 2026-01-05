import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeChat } from "./TypeChat";

export class ChatInvitePeek extends TLObject {
    static CONSTRUCTOR_ID = 1634294960;
    static SUBCLASS_OF_ID = 72750902;
    static className = "ChatInvitePeek";
    static classType = "constructor";

    chat!: TypeChat;
    expires!: number;

    constructor(args: { chat?: TypeChat, expires?: number } = {}) {
        super();
        this.chat = args.chat!;
        this.expires = args.expires!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1634294960, false);
        writer.write(this.chat.getBytes());
        writer.writeInt(this.expires);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): ChatInvitePeek {
        const args: any = {};
        const _chat = reader.tgReadObject();
        args.chat = _chat;
        const _expires = reader.readInt();
        args.expires = _expires;
        return new ChatInvitePeek(args);
    }
}