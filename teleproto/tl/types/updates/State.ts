import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";

export class State extends TLObject {
    static CONSTRUCTOR_ID = 2775329342;
    static SUBCLASS_OF_ID = 601823745;
    static className = "updates.State";
    static classType = "constructor";

    pts!: number;
    qts!: number;
    date!: number;
    seq!: number;
    unreadCount!: number;

    constructor(args: { pts?: number, qts?: number, date?: number, seq?: number, unreadCount?: number } = {}) {
        super();
        this.pts = args.pts!;
        this.qts = args.qts!;
        this.date = args.date!;
        this.seq = args.seq!;
        this.unreadCount = args.unreadCount!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2775329342, false);
        writer.writeInt(this.pts);
        writer.writeInt(this.qts);
        writer.writeInt(this.date);
        writer.writeInt(this.seq);
        writer.writeInt(this.unreadCount);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): State {
        const args: any = {};
        const _pts = reader.readInt();
        args.pts = _pts;
        const _qts = reader.readInt();
        args.qts = _qts;
        const _date = reader.readInt();
        args.date = _date;
        const _seq = reader.readInt();
        args.seq = _seq;
        const _unreadCount = reader.readInt();
        args.unreadCount = _unreadCount;
        return new State(args);
    }
}