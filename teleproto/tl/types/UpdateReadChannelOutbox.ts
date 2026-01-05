import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class UpdateReadChannelOutbox extends TLObject {
    static CONSTRUCTOR_ID = 3076495785;
    static SUBCLASS_OF_ID = 2676568142;
    static className = "UpdateReadChannelOutbox";
    static classType = "constructor";

    channelId!: bigint;
    maxId!: number;

    constructor(args: { channelId?: bigint, maxId?: number } = {}) {
        super();
        this.channelId = args.channelId!;
        this.maxId = args.maxId!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3076495785, false);
        writer.writeLargeInt(this.channelId, 64);
        writer.writeInt(this.maxId);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): UpdateReadChannelOutbox {
        const args: any = {};
        const _channelId = reader.readLargeInt(64);
        args.channelId = _channelId;
        const _maxId = reader.readInt();
        args.maxId = _maxId;
        return new UpdateReadChannelOutbox(args);
    }
}