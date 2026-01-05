import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypePeer } from "./TypePeer";
import { TypeStoryItem } from "./TypeStoryItem";

export class StoryViewPublicRepost extends TLObject {
    static CONSTRUCTOR_ID = 3178549065;
    static SUBCLASS_OF_ID = 898711459;
    static className = "StoryViewPublicRepost";
    static classType = "constructor";

    flags!: number;
    blocked?: boolean;
    blockedMyStoriesFrom?: boolean;
    peerId!: TypePeer;
    story!: TypeStoryItem;

    constructor(args: { flags?: number, blocked?: boolean, blockedMyStoriesFrom?: boolean, peerId?: TypePeer, story?: TypeStoryItem } = {}) {
        super();
        this.flags = args.flags!;
        this.blocked = args.blocked;
        this.blockedMyStoriesFrom = args.blockedMyStoriesFrom;
        this.peerId = args.peerId!;
        this.story = args.story!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3178549065, false);
        let flags = 0;
        if (this.blocked) { flags |= 1 << 0; }
        if (this.blockedMyStoriesFrom) { flags |= 1 << 1; }
        writer.writeInt(flags, false);
        if (this.blocked !== undefined && this.blocked !== null) {
        }
        if (this.blockedMyStoriesFrom !== undefined && this.blockedMyStoriesFrom !== null) {
        }
        writer.write(this.peerId.getBytes());
        writer.write(this.story.getBytes());
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): StoryViewPublicRepost {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _blocked = true;
            args.blocked = _blocked;
        } else {
            args.blocked = false;
        }
        if (args.flags & (1 << 1)) {
            const _blockedMyStoriesFrom = true;
            args.blockedMyStoriesFrom = _blockedMyStoriesFrom;
        } else {
            args.blockedMyStoriesFrom = false;
        }
        const _peerId = reader.tgReadObject();
        args.peerId = _peerId;
        const _story = reader.tgReadObject();
        args.story = _story;
        return new StoryViewPublicRepost(args);
    }
}