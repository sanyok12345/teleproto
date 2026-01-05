import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class PostInteractionCountersStory extends TLObject {
    static CONSTRUCTOR_ID = 2319978023;
    static SUBCLASS_OF_ID = 1850361243;
    static className = "PostInteractionCountersStory";
    static classType = "constructor";

    storyId!: number;
    views!: number;
    forwards!: number;
    reactions!: number;

    constructor(args: { storyId?: number, views?: number, forwards?: number, reactions?: number } = {}) {
        super();
        this.storyId = args.storyId!;
        this.views = args.views!;
        this.forwards = args.forwards!;
        this.reactions = args.reactions!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2319978023, false);
        writer.writeInt(this.storyId);
        writer.writeInt(this.views);
        writer.writeInt(this.forwards);
        writer.writeInt(this.reactions);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): PostInteractionCountersStory {
        const args: any = {};
        const _storyId = reader.readInt();
        args.storyId = _storyId;
        const _views = reader.readInt();
        args.views = _views;
        const _forwards = reader.readInt();
        args.forwards = _forwards;
        const _reactions = reader.readInt();
        args.reactions = _reactions;
        return new PostInteractionCountersStory(args);
    }
}