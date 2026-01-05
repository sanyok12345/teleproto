import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeInputPeer } from "./TypeInputPeer";

export class InputReplyToStory extends TLObject {
    static CONSTRUCTOR_ID = 1484862010;
    static SUBCLASS_OF_ID = 2356220701;
    static className = "InputReplyToStory";
    static classType = "constructor";

    peer!: TypeInputPeer;
    storyId!: number;

    constructor(args: { peer?: TypeInputPeer, storyId?: number } = {}) {
        super();
        this.peer = args.peer!;
        this.storyId = args.storyId!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1484862010, false);
        writer.write(this.peer.getBytes());
        writer.writeInt(this.storyId);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputReplyToStory {
        const args: any = {};
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        const _storyId = reader.readInt();
        args.storyId = _storyId;
        return new InputReplyToStory(args);
    }
}