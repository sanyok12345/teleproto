import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeEncryptedMessage } from "./TypeEncryptedMessage";

export class UpdateNewEncryptedMessage extends TLObject {
    static CONSTRUCTOR_ID = 314359194;
    static SUBCLASS_OF_ID = 2676568142;
    static className = "UpdateNewEncryptedMessage";
    static classType = "constructor";

    message!: TypeEncryptedMessage;
    qts!: number;

    constructor(args: { message?: TypeEncryptedMessage, qts?: number } = {}) {
        super();
        this.message = args.message!;
        this.qts = args.qts!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(314359194, false);
        writer.write(this.message.getBytes());
        writer.writeInt(this.qts);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): UpdateNewEncryptedMessage {
        const args: any = {};
        const _message = reader.tgReadObject();
        args.message = _message;
        const _qts = reader.readInt();
        args.qts = _qts;
        return new UpdateNewEncryptedMessage(args);
    }
}