import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class MsgNewDetailedInfo extends TLObject {
    static CONSTRUCTOR_ID = 2157819615;
    static SUBCLASS_OF_ID = 1597167086;
    static className = "MsgNewDetailedInfo";
    static classType = "constructor";

    answerMsgId!: bigint;
    bytes!: number;
    status!: number;

    constructor(args: { answerMsgId?: bigint, bytes?: number, status?: number } = {}) {
        super();
        this.answerMsgId = args.answerMsgId!;
        this.bytes = args.bytes!;
        this.status = args.status!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2157819615, false);
        writer.writeLargeInt(this.answerMsgId, 64);
        writer.writeInt(this.bytes);
        writer.writeInt(this.status);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): MsgNewDetailedInfo {
        const args: any = {};
        const _answerMsgId = reader.readLargeInt(64);
        args.answerMsgId = _answerMsgId;
        const _bytes = reader.readInt();
        args.bytes = _bytes;
        const _status = reader.readInt();
        args.status = _status;
        return new MsgNewDetailedInfo(args);
    }
}