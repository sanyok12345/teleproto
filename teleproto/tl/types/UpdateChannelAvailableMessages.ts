import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class UpdateChannelAvailableMessages extends TLObject {
    static CONSTRUCTOR_ID = 2990524056;
    static SUBCLASS_OF_ID = 2676568142;
    static className = "UpdateChannelAvailableMessages";
    static classType = "constructor";

    channelId!: bigint;
    availableMinId!: number;

    constructor(args: { channelId?: bigint, availableMinId?: number } = {}) {
        super();
        this.channelId = args.channelId!;
        this.availableMinId = args.availableMinId!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2990524056, false);
        writer.writeLargeInt(this.channelId, 64);
        writer.writeInt(this.availableMinId);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): UpdateChannelAvailableMessages {
        const args: any = {};
        const _channelId = reader.readLargeInt(64);
        args.channelId = _channelId;
        const _availableMinId = reader.readInt();
        args.availableMinId = _availableMinId;
        return new UpdateChannelAvailableMessages(args);
    }
}