import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class GroupCallStreamChannel extends TLObject {
    static CONSTRUCTOR_ID = 2162903215;
    static SUBCLASS_OF_ID = 3712266840;
    static className = "GroupCallStreamChannel";
    static classType = "constructor";

    channel!: number;
    scale!: number;
    lastTimestampMs!: bigint;

    constructor(args: { channel?: number, scale?: number, lastTimestampMs?: bigint } = {}) {
        super();
        this.channel = args.channel!;
        this.scale = args.scale!;
        this.lastTimestampMs = args.lastTimestampMs!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2162903215, false);
        writer.writeInt(this.channel);
        writer.writeInt(this.scale);
        writer.writeLargeInt(this.lastTimestampMs, 64);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): GroupCallStreamChannel {
        const args: any = {};
        const _channel = reader.readInt();
        args.channel = _channel;
        const _scale = reader.readInt();
        args.scale = _scale;
        const _lastTimestampMs = reader.readLargeInt(64);
        args.lastTimestampMs = _lastTimestampMs;
        return new GroupCallStreamChannel(args);
    }
}