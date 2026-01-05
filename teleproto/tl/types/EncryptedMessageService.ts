import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class EncryptedMessageService extends TLObject {
    static CONSTRUCTOR_ID = 594758406;
    static SUBCLASS_OF_ID = 597634641;
    static className = "EncryptedMessageService";
    static classType = "constructor";

    randomId!: bigint;
    chatId!: number;
    date!: number;
    bytes!: Buffer;

    constructor(args: { randomId?: bigint, chatId?: number, date?: number, bytes?: Buffer } = {}) {
        super();
        this.randomId = args.randomId!;
        this.chatId = args.chatId!;
        this.date = args.date!;
        this.bytes = args.bytes!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(594758406, false);
        writer.writeLargeInt(this.randomId, 64);
        writer.writeInt(this.chatId);
        writer.writeInt(this.date);
        writer.tgWriteBytes(this.bytes);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): EncryptedMessageService {
        const args: any = {};
        const _randomId = reader.readLargeInt(64);
        args.randomId = _randomId;
        const _chatId = reader.readInt();
        args.chatId = _chatId;
        const _date = reader.readInt();
        args.date = _date;
        const _bytes = reader.tgReadBytes();
        args.bytes = _bytes;
        return new EncryptedMessageService(args);
    }
}