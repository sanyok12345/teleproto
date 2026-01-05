import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeEncryptedChat } from "./TypeEncryptedChat";

export class UpdateEncryption extends TLObject {
    static CONSTRUCTOR_ID = 3030575245;
    static SUBCLASS_OF_ID = 2676568142;
    static className = "UpdateEncryption";
    static classType = "constructor";

    chat!: TypeEncryptedChat;
    date!: number;

    constructor(args: { chat?: TypeEncryptedChat, date?: number } = {}) {
        super();
        this.chat = args.chat!;
        this.date = args.date!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3030575245, false);
        writer.write(this.chat.getBytes());
        writer.writeInt(this.date);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): UpdateEncryption {
        const args: any = {};
        const _chat = reader.tgReadObject();
        args.chat = _chat;
        const _date = reader.readInt();
        args.date = _date;
        return new UpdateEncryption(args);
    }
}