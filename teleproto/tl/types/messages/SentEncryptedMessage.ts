import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";

export class SentEncryptedMessage extends TLObject {
    static CONSTRUCTOR_ID = 1443858741;
    static SUBCLASS_OF_ID = 3382591056;
    static className = "messages.SentEncryptedMessage";
    static classType = "constructor";

    date!: number;

    constructor(args: { date?: number } = {}) {
        super();
        this.date = args.date!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1443858741, false);
        writer.writeInt(this.date);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): SentEncryptedMessage {
        const args: any = {};
        const _date = reader.readInt();
        args.date = _date;
        return new SentEncryptedMessage(args);
    }
}