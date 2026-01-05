import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class UpdateDeleteMessages extends TLObject {
    static CONSTRUCTOR_ID = 2718806245;
    static SUBCLASS_OF_ID = 2676568142;
    static className = "UpdateDeleteMessages";
    static classType = "constructor";

    messages!: number[];
    pts!: number;
    ptsCount!: number;

    constructor(args: { messages?: number[], pts?: number, ptsCount?: number } = {}) {
        super();
        this.messages = args.messages!;
        this.pts = args.pts!;
        this.ptsCount = args.ptsCount!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2718806245, false);
        writer.writeVector(this.messages, (item) => {
            writer.writeInt(item);
        });
        writer.writeInt(this.pts);
        writer.writeInt(this.ptsCount);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): UpdateDeleteMessages {
        const args: any = {};
        const _messages = reader.readVector((reader) => {
            const item = reader.readInt();
            return item;
        });
        args.messages = _messages;
        const _pts = reader.readInt();
        args.pts = _pts;
        const _ptsCount = reader.readInt();
        args.ptsCount = _ptsCount;
        return new UpdateDeleteMessages(args);
    }
}