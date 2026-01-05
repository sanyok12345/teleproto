import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class UpdateChannelMessageForwards extends TLObject {
    static CONSTRUCTOR_ID = 3533318132;
    static SUBCLASS_OF_ID = 2676568142;
    static className = "UpdateChannelMessageForwards";
    static classType = "constructor";

    channelId!: bigint;
    id!: number;
    forwards!: number;

    constructor(args: { channelId?: bigint, id?: number, forwards?: number } = {}) {
        super();
        this.channelId = args.channelId!;
        this.id = args.id!;
        this.forwards = args.forwards!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3533318132, false);
        writer.writeLargeInt(this.channelId, 64);
        writer.writeInt(this.id);
        writer.writeInt(this.forwards);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): UpdateChannelMessageForwards {
        const args: any = {};
        const _channelId = reader.readLargeInt(64);
        args.channelId = _channelId;
        const _id = reader.readInt();
        args.id = _id;
        const _forwards = reader.readInt();
        args.forwards = _forwards;
        return new UpdateChannelMessageForwards(args);
    }
}