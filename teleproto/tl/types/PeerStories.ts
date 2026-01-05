import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypePeer } from "./TypePeer";
import { TypeStoryItem } from "./TypeStoryItem";

export class PeerStories extends TLObject {
    static CONSTRUCTOR_ID = 2587224473;
    static SUBCLASS_OF_ID = 304908871;
    static className = "PeerStories";
    static classType = "constructor";

    flags!: number;
    peer!: TypePeer;
    maxReadId?: number;
    stories!: TypeStoryItem[];

    constructor(args: { flags?: number, peer?: TypePeer, maxReadId?: number, stories?: TypeStoryItem[] } = {}) {
        super();
        this.flags = args.flags!;
        this.peer = args.peer!;
        this.maxReadId = args.maxReadId;
        this.stories = args.stories!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2587224473, false);
        let flags = 0;
        if (this.maxReadId !== undefined && this.maxReadId !== null) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        writer.write(this.peer.getBytes());
        if (this.maxReadId !== undefined && this.maxReadId !== null) {
            writer.writeInt(this.maxReadId);
        }
        writer.writeVector(this.stories, (item) => {
            writer.write(item.getBytes());
        });
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): PeerStories {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        if (args.flags & (1 << 0)) {
            const _maxReadId = reader.readInt();
            args.maxReadId = _maxReadId;
        } else {
            args.maxReadId = undefined;
        }
        const _stories = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.stories = _stories;
        return new PeerStories(args);
    }
}