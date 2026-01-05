import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypePeer } from "./TypePeer";

export class UpdateChannelReadMessagesContents extends TLObject {
    static CONSTRUCTOR_ID = 636691703;
    static SUBCLASS_OF_ID = 2676568142;
    static className = "UpdateChannelReadMessagesContents";
    static classType = "constructor";

    flags!: number;
    channelId!: bigint;
    topMsgId?: number;
    savedPeerId?: TypePeer;
    messages!: number[];

    constructor(args: { flags?: number, channelId?: bigint, topMsgId?: number, savedPeerId?: TypePeer, messages?: number[] } = {}) {
        super();
        this.flags = args.flags!;
        this.channelId = args.channelId!;
        this.topMsgId = args.topMsgId;
        this.savedPeerId = args.savedPeerId;
        this.messages = args.messages!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(636691703, false);
        let flags = 0;
        if (this.topMsgId !== undefined && this.topMsgId !== null) { flags |= 1 << 0; }
        if (this.savedPeerId !== undefined && this.savedPeerId !== null) { flags |= 1 << 1; }
        writer.writeInt(flags, false);
        writer.writeLargeInt(this.channelId, 64);
        if (this.topMsgId !== undefined && this.topMsgId !== null) {
            writer.writeInt(this.topMsgId);
        }
        if (this.savedPeerId !== undefined && this.savedPeerId !== null) {
            writer.write(this.savedPeerId.getBytes());
        }
        writer.writeVector(this.messages, (item) => {
            writer.writeInt(item);
        });
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): UpdateChannelReadMessagesContents {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        const _channelId = reader.readLargeInt(64);
        args.channelId = _channelId;
        if (args.flags & (1 << 0)) {
            const _topMsgId = reader.readInt();
            args.topMsgId = _topMsgId;
        } else {
            args.topMsgId = undefined;
        }
        if (args.flags & (1 << 1)) {
            const _savedPeerId = reader.tgReadObject();
            args.savedPeerId = _savedPeerId;
        } else {
            args.savedPeerId = undefined;
        }
        const _messages = reader.readVector((reader) => {
            const item = reader.readInt();
            return item;
        });
        args.messages = _messages;
        return new UpdateChannelReadMessagesContents(args);
    }
}