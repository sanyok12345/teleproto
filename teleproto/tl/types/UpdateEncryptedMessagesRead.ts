import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class UpdateEncryptedMessagesRead extends TLObject {
    static CONSTRUCTOR_ID = 956179895;
    static SUBCLASS_OF_ID = 2676568142;
    static className = "UpdateEncryptedMessagesRead";
    static classType = "constructor";

    chatId!: number;
    maxDate!: number;
    date!: number;

    constructor(args: { chatId?: number, maxDate?: number, date?: number } = {}) {
        super();
        this.chatId = args.chatId!;
        this.maxDate = args.maxDate!;
        this.date = args.date!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(956179895, false);
        writer.writeInt(this.chatId);
        writer.writeInt(this.maxDate);
        writer.writeInt(this.date);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): UpdateEncryptedMessagesRead {
        const args: any = {};
        const _chatId = reader.readInt();
        args.chatId = _chatId;
        const _maxDate = reader.readInt();
        args.maxDate = _maxDate;
        const _date = reader.readInt();
        args.date = _date;
        return new UpdateEncryptedMessagesRead(args);
    }
}