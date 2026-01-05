import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class UpdateChannelViewForumAsMessages extends TLObject {
    static CONSTRUCTOR_ID = 129403168;
    static SUBCLASS_OF_ID = 2676568142;
    static className = "UpdateChannelViewForumAsMessages";
    static classType = "constructor";

    channelId!: bigint;
    enabled!: boolean;

    constructor(args: { channelId?: bigint, enabled?: boolean } = {}) {
        super();
        this.channelId = args.channelId!;
        this.enabled = args.enabled!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(129403168, false);
        writer.writeLargeInt(this.channelId, 64);
        writer.tgWriteBool(this.enabled);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): UpdateChannelViewForumAsMessages {
        const args: any = {};
        const _channelId = reader.readLargeInt(64);
        args.channelId = _channelId;
        const _enabled = reader.tgReadBool();
        args.enabled = _enabled;
        return new UpdateChannelViewForumAsMessages(args);
    }
}