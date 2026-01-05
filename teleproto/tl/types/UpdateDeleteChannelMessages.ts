import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class UpdateDeleteChannelMessages extends TLObject {
    static CONSTRUCTOR_ID = 3274529554;
    static SUBCLASS_OF_ID = 2676568142;
    static className = "UpdateDeleteChannelMessages";
    static classType = "constructor";

    channelId!: bigint;
    messages!: number[];
    pts!: number;
    ptsCount!: number;

    constructor(args: { channelId?: bigint, messages?: number[], pts?: number, ptsCount?: number } = {}) {
        super();
        this.channelId = args.channelId!;
        this.messages = args.messages!;
        this.pts = args.pts!;
        this.ptsCount = args.ptsCount!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3274529554, false);
        writer.writeLargeInt(this.channelId, 64);
        writer.writeVector(this.messages, (item) => {
            writer.writeInt(item);
        });
        writer.writeInt(this.pts);
        writer.writeInt(this.ptsCount);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): UpdateDeleteChannelMessages {
        const args: any = {};
        const _channelId = reader.readLargeInt(64);
        args.channelId = _channelId;
        const _messages = reader.readVector((reader) => {
            const item = reader.readInt();
            return item;
        });
        args.messages = _messages;
        const _pts = reader.readInt();
        args.pts = _pts;
        const _ptsCount = reader.readInt();
        args.ptsCount = _ptsCount;
        return new UpdateDeleteChannelMessages(args);
    }
}