import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";

export class AffectedMessages extends TLObject {
    static CONSTRUCTOR_ID = 2228326789;
    static SUBCLASS_OF_ID = 3469983854;
    static className = "messages.AffectedMessages";
    static classType = "constructor";

    pts!: number;
    ptsCount!: number;

    constructor(args: { pts?: number, ptsCount?: number } = {}) {
        super();
        this.pts = args.pts!;
        this.ptsCount = args.ptsCount!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2228326789, false);
        writer.writeInt(this.pts);
        writer.writeInt(this.ptsCount);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): AffectedMessages {
        const args: any = {};
        const _pts = reader.readInt();
        args.pts = _pts;
        const _ptsCount = reader.readInt();
        args.ptsCount = _ptsCount;
        return new AffectedMessages(args);
    }
}