import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeEncryptedFile } from "./TypeEncryptedFile";

export class EncryptedMessage extends TLObject {
    static CONSTRUCTOR_ID = 3977822488;
    static SUBCLASS_OF_ID = 597634641;
    static className = "EncryptedMessage";
    static classType = "constructor";

    randomId!: bigint;
    chatId!: number;
    date!: number;
    bytes!: Buffer;
    file!: TypeEncryptedFile;

    constructor(args: { randomId?: bigint, chatId?: number, date?: number, bytes?: Buffer, file?: TypeEncryptedFile } = {}) {
        super();
        this.randomId = args.randomId!;
        this.chatId = args.chatId!;
        this.date = args.date!;
        this.bytes = args.bytes!;
        this.file = args.file!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3977822488, false);
        writer.writeLargeInt(this.randomId, 64);
        writer.writeInt(this.chatId);
        writer.writeInt(this.date);
        writer.tgWriteBytes(this.bytes);
        writer.write(this.file.getBytes());
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): EncryptedMessage {
        const args: any = {};
        const _randomId = reader.readLargeInt(64);
        args.randomId = _randomId;
        const _chatId = reader.readInt();
        args.chatId = _chatId;
        const _date = reader.readInt();
        args.date = _date;
        const _bytes = reader.tgReadBytes();
        args.bytes = _bytes;
        const _file = reader.tgReadObject();
        args.file = _file;
        return new EncryptedMessage(args);
    }
}