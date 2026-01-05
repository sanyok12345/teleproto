import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class UpdateReadMessagesContents extends TLObject {
    static CONSTRUCTOR_ID = 4163006849;
    static SUBCLASS_OF_ID = 2676568142;
    static className = "UpdateReadMessagesContents";
    static classType = "constructor";

    flags!: number;
    messages!: number[];
    pts!: number;
    ptsCount!: number;
    date?: number;

    constructor(args: { flags?: number, messages?: number[], pts?: number, ptsCount?: number, date?: number } = {}) {
        super();
        this.flags = args.flags!;
        this.messages = args.messages!;
        this.pts = args.pts!;
        this.ptsCount = args.ptsCount!;
        this.date = args.date;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(4163006849, false);
        let flags = 0;
        if (this.date !== undefined && this.date !== null) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        writer.writeVector(this.messages, (item) => {
            writer.writeInt(item);
        });
        writer.writeInt(this.pts);
        writer.writeInt(this.ptsCount);
        if (this.date !== undefined && this.date !== null) {
            writer.writeInt(this.date);
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): UpdateReadMessagesContents {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        const _messages = reader.readVector((reader) => {
            const item = reader.readInt();
            return item;
        });
        args.messages = _messages;
        const _pts = reader.readInt();
        args.pts = _pts;
        const _ptsCount = reader.readInt();
        args.ptsCount = _ptsCount;
        if (args.flags & (1 << 0)) {
            const _date = reader.readInt();
            args.date = _date;
        } else {
            args.date = undefined;
        }
        return new UpdateReadMessagesContents(args);
    }
}