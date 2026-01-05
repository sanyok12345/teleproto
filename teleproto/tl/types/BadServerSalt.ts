import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class BadServerSalt extends TLObject {
    static CONSTRUCTOR_ID = 3987424379;
    static SUBCLASS_OF_ID = 3468337495;
    static className = "BadServerSalt";
    static classType = "constructor";

    badMsgId!: bigint;
    badMsgSeqno!: number;
    errorCode!: number;
    newServerSalt!: bigint;

    constructor(args: { badMsgId?: bigint, badMsgSeqno?: number, errorCode?: number, newServerSalt?: bigint } = {}) {
        super();
        this.badMsgId = args.badMsgId!;
        this.badMsgSeqno = args.badMsgSeqno!;
        this.errorCode = args.errorCode!;
        this.newServerSalt = args.newServerSalt!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3987424379, false);
        writer.writeLargeInt(this.badMsgId, 64);
        writer.writeInt(this.badMsgSeqno);
        writer.writeInt(this.errorCode);
        writer.writeLargeInt(this.newServerSalt, 64);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): BadServerSalt {
        const args: any = {};
        const _badMsgId = reader.readLargeInt(64);
        args.badMsgId = _badMsgId;
        const _badMsgSeqno = reader.readInt();
        args.badMsgSeqno = _badMsgSeqno;
        const _errorCode = reader.readInt();
        args.errorCode = _errorCode;
        const _newServerSalt = reader.readLargeInt(64);
        args.newServerSalt = _newServerSalt;
        return new BadServerSalt(args);
    }
}