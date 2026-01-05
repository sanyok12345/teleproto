import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class InputEncryptedChat extends TLObject {
    static CONSTRUCTOR_ID = 4047615457;
    static SUBCLASS_OF_ID = 1819674304;
    static className = "InputEncryptedChat";
    static classType = "constructor";

    chatId!: number;
    accessHash!: bigint;

    constructor(args: { chatId?: number, accessHash?: bigint } = {}) {
        super();
        this.chatId = args.chatId!;
        this.accessHash = args.accessHash!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(4047615457, false);
        writer.writeInt(this.chatId);
        writer.writeLargeInt(this.accessHash, 64);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputEncryptedChat {
        const args: any = {};
        const _chatId = reader.readInt();
        args.chatId = _chatId;
        const _accessHash = reader.readLargeInt(64);
        args.accessHash = _accessHash;
        return new InputEncryptedChat(args);
    }
}