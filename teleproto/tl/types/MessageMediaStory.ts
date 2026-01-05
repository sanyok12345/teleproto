import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypePeer } from "./TypePeer";
import { TypeStoryItem } from "./TypeStoryItem";

export class MessageMediaStory extends TLObject {
    static CONSTRUCTOR_ID = 1758159491;
    static SUBCLASS_OF_ID = 1198308914;
    static className = "MessageMediaStory";
    static classType = "constructor";

    flags!: number;
    viaMention?: boolean;
    peer!: TypePeer;
    id!: number;
    story?: TypeStoryItem;

    constructor(args: { flags?: number, viaMention?: boolean, peer?: TypePeer, id?: number, story?: TypeStoryItem } = {}) {
        super();
        this.flags = args.flags!;
        this.viaMention = args.viaMention;
        this.peer = args.peer!;
        this.id = args.id!;
        this.story = args.story;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1758159491, false);
        let flags = 0;
        if (this.viaMention) { flags |= 1 << 1; }
        if (this.story !== undefined && this.story !== null) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        if (this.viaMention !== undefined && this.viaMention !== null) {
        }
        writer.write(this.peer.getBytes());
        writer.writeInt(this.id);
        if (this.story !== undefined && this.story !== null) {
            writer.write(this.story.getBytes());
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): MessageMediaStory {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 1)) {
            const _viaMention = true;
            args.viaMention = _viaMention;
        } else {
            args.viaMention = false;
        }
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        const _id = reader.readInt();
        args.id = _id;
        if (args.flags & (1 << 0)) {
            const _story = reader.tgReadObject();
            args.story = _story;
        } else {
            args.story = undefined;
        }
        return new MessageMediaStory(args);
    }
}