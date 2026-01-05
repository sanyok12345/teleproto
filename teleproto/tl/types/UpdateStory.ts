import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypePeer } from "./TypePeer";
import { TypeStoryItem } from "./TypeStoryItem";

export class UpdateStory extends TLObject {
    static CONSTRUCTOR_ID = 1974712216;
    static SUBCLASS_OF_ID = 2676568142;
    static className = "UpdateStory";
    static classType = "constructor";

    peer!: TypePeer;
    story!: TypeStoryItem;

    constructor(args: { peer?: TypePeer, story?: TypeStoryItem } = {}) {
        super();
        this.peer = args.peer!;
        this.story = args.story!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1974712216, false);
        writer.write(this.peer.getBytes());
        writer.write(this.story.getBytes());
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): UpdateStory {
        const args: any = {};
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        const _story = reader.tgReadObject();
        args.story = _story;
        return new UpdateStory(args);
    }
}