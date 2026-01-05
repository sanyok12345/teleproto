import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeMediaAreaCoordinates } from "./TypeMediaAreaCoordinates";
import { TypeInputChannel } from "./TypeInputChannel";
import { MessageIDLike } from "./../../define";

export class InputMediaAreaChannelPost extends TLObject {
    static CONSTRUCTOR_ID = 577893055;
    static SUBCLASS_OF_ID = 4084038642;
    static className = "InputMediaAreaChannelPost";
    static classType = "constructor";

    coordinates!: TypeMediaAreaCoordinates;
    channel!: TypeInputChannel;
    msgId!: MessageIDLike;

    constructor(args: { coordinates?: TypeMediaAreaCoordinates, channel?: TypeInputChannel, msgId?: MessageIDLike } = {}) {
        super();
        this.coordinates = args.coordinates!;
        this.channel = args.channel!;
        this.msgId = args.msgId!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(577893055, false);
        writer.write(this.coordinates.getBytes());
        writer.write(this.channel.getBytes());
        if (typeof this.msgId === 'number') {
            writer.writeInt(this.msgId);
        } else {
            writer.writeInt((this.msgId as any).id);
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputMediaAreaChannelPost {
        const args: any = {};
        const _coordinates = reader.tgReadObject();
        args.coordinates = _coordinates;
        const _channel = reader.tgReadObject();
        args.channel = _channel;
        const _msgId = reader.tgReadObject();
        args.msgId = _msgId;
        return new InputMediaAreaChannelPost(args);
    }
}