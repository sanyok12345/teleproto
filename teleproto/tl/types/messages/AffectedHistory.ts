import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";

export class AffectedHistory extends TLObject {
    static CONSTRUCTOR_ID = 3025955281;
    static SUBCLASS_OF_ID = 743031062;
    static className = "messages.AffectedHistory";
    static classType = "constructor";

    pts!: number;
    ptsCount!: number;
    offset!: number;

    constructor(args: { pts?: number, ptsCount?: number, offset?: number } = {}) {
        super();
        this.pts = args.pts!;
        this.ptsCount = args.ptsCount!;
        this.offset = args.offset!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3025955281, false);
        writer.writeInt(this.pts);
        writer.writeInt(this.ptsCount);
        writer.writeInt(this.offset);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): AffectedHistory {
        const args: any = {};
        const _pts = reader.readInt();
        args.pts = _pts;
        const _ptsCount = reader.readInt();
        args.ptsCount = _ptsCount;
        const _offset = reader.readInt();
        args.offset = _offset;
        return new AffectedHistory(args);
    }
}