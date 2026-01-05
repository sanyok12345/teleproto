import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeMessage } from "./TypeMessage";

export class UpdateBotEditBusinessMessage extends TLObject {
    static CONSTRUCTOR_ID = 132077692;
    static SUBCLASS_OF_ID = 2676568142;
    static className = "UpdateBotEditBusinessMessage";
    static classType = "constructor";

    flags!: number;
    connectionId!: string;
    message!: TypeMessage;
    replyToMessage?: TypeMessage;
    qts!: number;

    constructor(args: { flags?: number, connectionId?: string, message?: TypeMessage, replyToMessage?: TypeMessage, qts?: number } = {}) {
        super();
        this.flags = args.flags!;
        this.connectionId = args.connectionId!;
        this.message = args.message!;
        this.replyToMessage = args.replyToMessage;
        this.qts = args.qts!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(132077692, false);
        let flags = 0;
        if (this.replyToMessage !== undefined && this.replyToMessage !== null) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        writer.tgWriteString(this.connectionId);
        writer.write(this.message.getBytes());
        if (this.replyToMessage !== undefined && this.replyToMessage !== null) {
            writer.write(this.replyToMessage.getBytes());
        }
        writer.writeInt(this.qts);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): UpdateBotEditBusinessMessage {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        const _connectionId = reader.tgReadString();
        args.connectionId = _connectionId;
        const _message = reader.tgReadObject();
        args.message = _message;
        if (args.flags & (1 << 0)) {
            const _replyToMessage = reader.tgReadObject();
            args.replyToMessage = _replyToMessage;
        } else {
            args.replyToMessage = undefined;
        }
        const _qts = reader.readInt();
        args.qts = _qts;
        return new UpdateBotEditBusinessMessage(args);
    }
}