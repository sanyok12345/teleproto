import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class UpdateChannelTooLong extends TLObject {
    static CONSTRUCTOR_ID = 277713951;
    static SUBCLASS_OF_ID = 2676568142;
    static className = "UpdateChannelTooLong";
    static classType = "constructor";

    flags!: number;
    channelId!: bigint;
    pts?: number;

    constructor(args: { flags?: number, channelId?: bigint, pts?: number } = {}) {
        super();
        this.flags = args.flags!;
        this.channelId = args.channelId!;
        this.pts = args.pts;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(277713951, false);
        let flags = 0;
        if (this.pts !== undefined && this.pts !== null) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        writer.writeLargeInt(this.channelId, 64);
        if (this.pts !== undefined && this.pts !== null) {
            writer.writeInt(this.pts);
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): UpdateChannelTooLong {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        const _channelId = reader.readLargeInt(64);
        args.channelId = _channelId;
        if (args.flags & (1 << 0)) {
            const _pts = reader.readInt();
            args.pts = _pts;
        } else {
            args.pts = undefined;
        }
        return new UpdateChannelTooLong(args);
    }
}