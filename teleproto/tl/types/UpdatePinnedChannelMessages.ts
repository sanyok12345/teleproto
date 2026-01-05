import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class UpdatePinnedChannelMessages extends TLObject {
    static CONSTRUCTOR_ID = 1538885128;
    static SUBCLASS_OF_ID = 2676568142;
    static className = "UpdatePinnedChannelMessages";
    static classType = "constructor";

    flags!: number;
    pinned?: boolean;
    channelId!: bigint;
    messages!: number[];
    pts!: number;
    ptsCount!: number;

    constructor(args: { flags?: number, pinned?: boolean, channelId?: bigint, messages?: number[], pts?: number, ptsCount?: number } = {}) {
        super();
        this.flags = args.flags!;
        this.pinned = args.pinned;
        this.channelId = args.channelId!;
        this.messages = args.messages!;
        this.pts = args.pts!;
        this.ptsCount = args.ptsCount!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1538885128, false);
        let flags = 0;
        if (this.pinned) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        if (this.pinned !== undefined && this.pinned !== null) {
        }
        writer.writeLargeInt(this.channelId, 64);
        writer.writeVector(this.messages, (item) => {
            writer.writeInt(item);
        });
        writer.writeInt(this.pts);
        writer.writeInt(this.ptsCount);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): UpdatePinnedChannelMessages {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _pinned = true;
            args.pinned = _pinned;
        } else {
            args.pinned = false;
        }
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
        return new UpdatePinnedChannelMessages(args);
    }
}