import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeMediaAreaCoordinates } from "./TypeMediaAreaCoordinates";
import { MessageIDLike } from "./../../define";

export class MediaAreaChannelPost extends TLObject {
    static CONSTRUCTOR_ID = 1996756655;
    static SUBCLASS_OF_ID = 4084038642;
    static className = "MediaAreaChannelPost";
    static classType = "constructor";

    coordinates!: TypeMediaAreaCoordinates;
    channelId!: bigint;
    msgId!: MessageIDLike;

    constructor(args: { coordinates?: TypeMediaAreaCoordinates, channelId?: bigint, msgId?: MessageIDLike } = {}) {
        super();
        this.coordinates = args.coordinates!;
        this.channelId = args.channelId!;
        this.msgId = args.msgId!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1996756655, false);
        writer.write(this.coordinates.getBytes());
        writer.writeLargeInt(this.channelId, 64);
        if (typeof this.msgId === 'number') {
            writer.writeInt(this.msgId);
        } else {
            writer.writeInt((this.msgId as any).id);
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): MediaAreaChannelPost {
        const args: any = {};
        const _coordinates = reader.tgReadObject();
        args.coordinates = _coordinates;
        const _channelId = reader.readLargeInt(64);
        args.channelId = _channelId;
        const _msgId = reader.tgReadObject();
        args.msgId = _msgId;
        return new MediaAreaChannelPost(args);
    }
}