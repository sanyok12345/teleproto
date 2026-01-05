import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypePeer } from "./TypePeer";
import { TypeStoryItem } from "./TypeStoryItem";

export class StoryReactionPublicRepost extends TLObject {
    static CONSTRUCTOR_ID = 3486322451;
    static SUBCLASS_OF_ID = 3379257259;
    static className = "StoryReactionPublicRepost";
    static classType = "constructor";

    peerId!: TypePeer;
    story!: TypeStoryItem;

    constructor(args: { peerId?: TypePeer, story?: TypeStoryItem } = {}) {
        super();
        this.peerId = args.peerId!;
        this.story = args.story!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3486322451, false);
        writer.write(this.peerId.getBytes());
        writer.write(this.story.getBytes());
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): StoryReactionPublicRepost {
        const args: any = {};
        const _peerId = reader.tgReadObject();
        args.peerId = _peerId;
        const _story = reader.tgReadObject();
        args.story = _story;
        return new StoryReactionPublicRepost(args);
    }
}