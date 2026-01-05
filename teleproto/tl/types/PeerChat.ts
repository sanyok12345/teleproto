import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class PeerChat extends TLObject {
    static CONSTRUCTOR_ID = 918946202;
    static SUBCLASS_OF_ID = 47470215;
    static className = "PeerChat";
    static classType = "constructor";

    chatId!: bigint;

    constructor(args: { chatId?: bigint } = {}) {
        super();
        this.chatId = args.chatId!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(918946202, false);
        writer.writeLargeInt(this.chatId, 64);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): PeerChat {
        const args: any = {};
        const _chatId = reader.readLargeInt(64);
        args.chatId = _chatId;
        return new PeerChat(args);
    }
}