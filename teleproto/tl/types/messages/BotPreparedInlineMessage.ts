import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";

export class BotPreparedInlineMessage extends TLObject {
    static CONSTRUCTOR_ID = 2395931921;
    static SUBCLASS_OF_ID = 4019263931;
    static className = "messages.BotPreparedInlineMessage";
    static classType = "constructor";

    id!: string;
    expireDate!: number;

    constructor(args: { id?: string, expireDate?: number } = {}) {
        super();
        this.id = args.id!;
        this.expireDate = args.expireDate!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2395931921, false);
        writer.tgWriteString(this.id);
        writer.writeInt(this.expireDate);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): BotPreparedInlineMessage {
        const args: any = {};
        const _id = reader.tgReadString();
        args.id = _id;
        const _expireDate = reader.readInt();
        args.expireDate = _expireDate;
        return new BotPreparedInlineMessage(args);
    }
}