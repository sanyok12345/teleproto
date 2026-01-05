import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class InputPeerChat extends TLObject {
    static CONSTRUCTOR_ID = 900291769;
    static SUBCLASS_OF_ID = 3374092470;
    static className = "InputPeerChat";
    static classType = "constructor";

    chatId!: bigint;

    constructor(args: { chatId?: bigint } = {}) {
        super();
        this.chatId = args.chatId!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(900291769, false);
        writer.writeLargeInt(this.chatId, 64);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputPeerChat {
        const args: any = {};
        const _chatId = reader.readLargeInt(64);
        args.chatId = _chatId;
        return new InputPeerChat(args);
    }
}