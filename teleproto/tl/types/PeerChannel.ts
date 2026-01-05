import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class PeerChannel extends TLObject {
    static CONSTRUCTOR_ID = 2728736542;
    static SUBCLASS_OF_ID = 47470215;
    static className = "PeerChannel";
    static classType = "constructor";

    channelId!: bigint;

    constructor(args: { channelId?: bigint } = {}) {
        super();
        this.channelId = args.channelId!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2728736542, false);
        writer.writeLargeInt(this.channelId, 64);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): PeerChannel {
        const args: any = {};
        const _channelId = reader.readLargeInt(64);
        args.channelId = _channelId;
        return new PeerChannel(args);
    }
}