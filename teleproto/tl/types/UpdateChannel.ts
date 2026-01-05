import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class UpdateChannel extends TLObject {
    static CONSTRUCTOR_ID = 1666927625;
    static SUBCLASS_OF_ID = 2676568142;
    static className = "UpdateChannel";
    static classType = "constructor";

    channelId!: bigint;

    constructor(args: { channelId?: bigint } = {}) {
        super();
        this.channelId = args.channelId!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1666927625, false);
        writer.writeLargeInt(this.channelId, 64);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): UpdateChannel {
        const args: any = {};
        const _channelId = reader.readLargeInt(64);
        args.channelId = _channelId;
        return new UpdateChannel(args);
    }
}