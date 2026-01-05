import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypePeer } from "./TypePeer";
import { TypeStoryItem } from "./TypeStoryItem";

export class WebPageAttributeStory extends TLObject {
    static CONSTRUCTOR_ID = 781501415;
    static SUBCLASS_OF_ID = 2949638599;
    static className = "WebPageAttributeStory";
    static classType = "constructor";

    flags!: number;
    peer!: TypePeer;
    id!: number;
    story?: TypeStoryItem;

    constructor(args: { flags?: number, peer?: TypePeer, id?: number, story?: TypeStoryItem } = {}) {
        super();
        this.flags = args.flags!;
        this.peer = args.peer!;
        this.id = args.id!;
        this.story = args.story;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(781501415, false);
        let flags = 0;
        if (this.story !== undefined && this.story !== null) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        writer.write(this.peer.getBytes());
        writer.writeInt(this.id);
        if (this.story !== undefined && this.story !== null) {
            writer.write(this.story.getBytes());
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): WebPageAttributeStory {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
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
        return new WebPageAttributeStory(args);
    }
}