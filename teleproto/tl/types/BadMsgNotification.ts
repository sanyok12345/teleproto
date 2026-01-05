import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class BadMsgNotification extends TLObject {
    static CONSTRUCTOR_ID = 2817521681;
    static SUBCLASS_OF_ID = 3468337495;
    static className = "BadMsgNotification";
    static classType = "constructor";

    badMsgId!: bigint;
    badMsgSeqno!: number;
    errorCode!: number;

    constructor(args: { badMsgId?: bigint, badMsgSeqno?: number, errorCode?: number } = {}) {
        super();
        this.badMsgId = args.badMsgId!;
        this.badMsgSeqno = args.badMsgSeqno!;
        this.errorCode = args.errorCode!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2817521681, false);
        writer.writeLargeInt(this.badMsgId, 64);
        writer.writeInt(this.badMsgSeqno);
        writer.writeInt(this.errorCode);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): BadMsgNotification {
        const args: any = {};
        const _badMsgId = reader.readLargeInt(64);
        args.badMsgId = _badMsgId;
        const _badMsgSeqno = reader.readInt();
        args.badMsgSeqno = _badMsgSeqno;
        const _errorCode = reader.readInt();
        args.errorCode = _errorCode;
        return new BadMsgNotification(args);
    }
}