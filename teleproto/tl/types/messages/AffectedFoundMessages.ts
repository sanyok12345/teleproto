import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";

export class AffectedFoundMessages extends TLObject {
    static CONSTRUCTOR_ID = 4019011180;
    static SUBCLASS_OF_ID = 4162282798;
    static className = "messages.AffectedFoundMessages";
    static classType = "constructor";

    pts!: number;
    ptsCount!: number;
    offset!: number;
    messages!: number[];

    constructor(args: { pts?: number, ptsCount?: number, offset?: number, messages?: number[] } = {}) {
        super();
        this.pts = args.pts!;
        this.ptsCount = args.ptsCount!;
        this.offset = args.offset!;
        this.messages = args.messages!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(4019011180, false);
        writer.writeInt(this.pts);
        writer.writeInt(this.ptsCount);
        writer.writeInt(this.offset);
        writer.writeVector(this.messages, (item) => {
            writer.writeInt(item);
        });
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): AffectedFoundMessages {
        const args: any = {};
        const _pts = reader.readInt();
        args.pts = _pts;
        const _ptsCount = reader.readInt();
        args.ptsCount = _ptsCount;
        const _offset = reader.readInt();
        args.offset = _offset;
        const _messages = reader.readVector((reader) => {
            const item = reader.readInt();
            return item;
        });
        args.messages = _messages;
        return new AffectedFoundMessages(args);
    }
}