import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypePeer } from "./TypePeer";
import { TypeReaction } from "./TypeReaction";

export class UpdateNewStoryReaction extends TLObject {
    static CONSTRUCTOR_ID = 405070859;
    static SUBCLASS_OF_ID = 2676568142;
    static className = "UpdateNewStoryReaction";
    static classType = "constructor";

    storyId!: number;
    peer!: TypePeer;
    reaction!: TypeReaction;

    constructor(args: { storyId?: number, peer?: TypePeer, reaction?: TypeReaction } = {}) {
        super();
        this.storyId = args.storyId!;
        this.peer = args.peer!;
        this.reaction = args.reaction!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(405070859, false);
        writer.writeInt(this.storyId);
        writer.write(this.peer.getBytes());
        writer.write(this.reaction.getBytes());
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): UpdateNewStoryReaction {
        const args: any = {};
        const _storyId = reader.readInt();
        args.storyId = _storyId;
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        const _reaction = reader.tgReadObject();
        args.reaction = _reaction;
        return new UpdateNewStoryReaction(args);
    }
}