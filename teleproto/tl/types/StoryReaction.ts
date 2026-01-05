import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypePeer } from "./TypePeer";
import { TypeReaction } from "./TypeReaction";

export class StoryReaction extends TLObject {
    static CONSTRUCTOR_ID = 1620104917;
    static SUBCLASS_OF_ID = 3379257259;
    static className = "StoryReaction";
    static classType = "constructor";

    peerId!: TypePeer;
    date!: number;
    reaction!: TypeReaction;

    constructor(args: { peerId?: TypePeer, date?: number, reaction?: TypeReaction } = {}) {
        super();
        this.peerId = args.peerId!;
        this.date = args.date!;
        this.reaction = args.reaction!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1620104917, false);
        writer.write(this.peerId.getBytes());
        writer.writeInt(this.date);
        writer.write(this.reaction.getBytes());
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): StoryReaction {
        const args: any = {};
        const _peerId = reader.tgReadObject();
        args.peerId = _peerId;
        const _date = reader.readInt();
        args.date = _date;
        const _reaction = reader.tgReadObject();
        args.reaction = _reaction;
        return new StoryReaction(args);
    }
}