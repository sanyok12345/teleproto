import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class MsgDetailedInfo extends TLObject {
    static CONSTRUCTOR_ID = 661470918;
    static SUBCLASS_OF_ID = 1597167086;
    static className = "MsgDetailedInfo";
    static classType = "constructor";

    msgId!: bigint;
    answerMsgId!: bigint;
    bytes!: number;
    status!: number;

    constructor(args: { msgId?: bigint, answerMsgId?: bigint, bytes?: number, status?: number } = {}) {
        super();
        this.msgId = args.msgId!;
        this.answerMsgId = args.answerMsgId!;
        this.bytes = args.bytes!;
        this.status = args.status!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(661470918, false);
        writer.writeLargeInt(this.msgId, 64);
        writer.writeLargeInt(this.answerMsgId, 64);
        writer.writeInt(this.bytes);
        writer.writeInt(this.status);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): MsgDetailedInfo {
        const args: any = {};
        const _msgId = reader.readLargeInt(64);
        args.msgId = _msgId;
        const _answerMsgId = reader.readLargeInt(64);
        args.answerMsgId = _answerMsgId;
        const _bytes = reader.readInt();
        args.bytes = _bytes;
        const _status = reader.readInt();
        args.status = _status;
        return new MsgDetailedInfo(args);
    }
}