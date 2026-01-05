import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeChat } from "./TypeChat";

export class ChatInviteAlready extends TLObject {
    static CONSTRUCTOR_ID = 1516793212;
    static SUBCLASS_OF_ID = 72750902;
    static className = "ChatInviteAlready";
    static classType = "constructor";

    chat!: TypeChat;

    constructor(args: { chat?: TypeChat } = {}) {
        super();
        this.chat = args.chat!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1516793212, false);
        writer.write(this.chat.getBytes());
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): ChatInviteAlready {
        const args: any = {};
        const _chat = reader.tgReadObject();
        args.chat = _chat;
        return new ChatInviteAlready(args);
    }
}