import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypePeer } from "./TypePeer";

export class UpdateReadMonoForumOutbox extends TLObject {
    static CONSTRUCTOR_ID = 2762445686;
    static SUBCLASS_OF_ID = 2676568142;
    static className = "UpdateReadMonoForumOutbox";
    static classType = "constructor";

    channelId!: bigint;
    savedPeerId!: TypePeer;
    readMaxId!: number;

    constructor(args: { channelId?: bigint, savedPeerId?: TypePeer, readMaxId?: number } = {}) {
        super();
        this.channelId = args.channelId!;
        this.savedPeerId = args.savedPeerId!;
        this.readMaxId = args.readMaxId!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2762445686, false);
        writer.writeLargeInt(this.channelId, 64);
        writer.write(this.savedPeerId.getBytes());
        writer.writeInt(this.readMaxId);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): UpdateReadMonoForumOutbox {
        const args: any = {};
        const _channelId = reader.readLargeInt(64);
        args.channelId = _channelId;
        const _savedPeerId = reader.tgReadObject();
        args.savedPeerId = _savedPeerId;
        const _readMaxId = reader.readInt();
        args.readMaxId = _readMaxId;
        return new UpdateReadMonoForumOutbox(args);
    }
}