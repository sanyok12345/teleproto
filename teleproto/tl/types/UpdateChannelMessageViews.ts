import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class UpdateChannelMessageViews extends TLObject {
    static CONSTRUCTOR_ID = 4062620680;
    static SUBCLASS_OF_ID = 2676568142;
    static className = "UpdateChannelMessageViews";
    static classType = "constructor";

    channelId!: bigint;
    id!: number;
    views!: number;

    constructor(args: { channelId?: bigint, id?: number, views?: number } = {}) {
        super();
        this.channelId = args.channelId!;
        this.id = args.id!;
        this.views = args.views!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(4062620680, false);
        writer.writeLargeInt(this.channelId, 64);
        writer.writeInt(this.id);
        writer.writeInt(this.views);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): UpdateChannelMessageViews {
        const args: any = {};
        const _channelId = reader.readLargeInt(64);
        args.channelId = _channelId;
        const _id = reader.readInt();
        args.id = _id;
        const _views = reader.readInt();
        args.views = _views;
        return new UpdateChannelMessageViews(args);
    }
}