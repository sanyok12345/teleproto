import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypePeer } from "./TypePeer";
import { TypeStoryItem } from "./TypeStoryItem";

export class FoundStory extends TLObject {
    static CONSTRUCTOR_ID = 3900361664;
    static SUBCLASS_OF_ID = 3005049029;
    static className = "FoundStory";
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
        writer.writeInt(3900361664, false);
        writer.write(this.peer.getBytes());
        writer.write(this.story.getBytes());
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): FoundStory {
        const args: any = {};
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        const _story = reader.tgReadObject();
        args.story = _story;
        return new FoundStory(args);
    }
}