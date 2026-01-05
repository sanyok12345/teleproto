import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypePeer } from "./TypePeer";
import { TypeReaction } from "./TypeReaction";

export class UpdateSentStoryReaction extends TLObject {
    static CONSTRUCTOR_ID = 2103604867;
    static SUBCLASS_OF_ID = 2676568142;
    static className = "UpdateSentStoryReaction";
    static classType = "constructor";

    peer!: TypePeer;
    storyId!: number;
    reaction!: TypeReaction;

    constructor(args: { peer?: TypePeer, storyId?: number, reaction?: TypeReaction } = {}) {
        super();
        this.peer = args.peer!;
        this.storyId = args.storyId!;
        this.reaction = args.reaction!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2103604867, false);
        writer.write(this.peer.getBytes());
        writer.writeInt(this.storyId);
        writer.write(this.reaction.getBytes());
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): UpdateSentStoryReaction {
        const args: any = {};
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        const _storyId = reader.readInt();
        args.storyId = _storyId;
        const _reaction = reader.tgReadObject();
        args.reaction = _reaction;
        return new UpdateSentStoryReaction(args);
    }
}