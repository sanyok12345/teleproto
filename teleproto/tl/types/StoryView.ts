import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeReaction } from "./TypeReaction";

export class StoryView extends TLObject {
    static CONSTRUCTOR_ID = 2965236421;
    static SUBCLASS_OF_ID = 898711459;
    static className = "StoryView";
    static classType = "constructor";

    flags!: number;
    blocked?: boolean;
    blockedMyStoriesFrom?: boolean;
    userId!: bigint;
    date!: number;
    reaction?: TypeReaction;

    constructor(args: { flags?: number, blocked?: boolean, blockedMyStoriesFrom?: boolean, userId?: bigint, date?: number, reaction?: TypeReaction } = {}) {
        super();
        this.flags = args.flags!;
        this.blocked = args.blocked;
        this.blockedMyStoriesFrom = args.blockedMyStoriesFrom;
        this.userId = args.userId!;
        this.date = args.date!;
        this.reaction = args.reaction;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2965236421, false);
        let flags = 0;
        if (this.blocked) { flags |= 1 << 0; }
        if (this.blockedMyStoriesFrom) { flags |= 1 << 1; }
        if (this.reaction !== undefined && this.reaction !== null) { flags |= 1 << 2; }
        writer.writeInt(flags, false);
        if (this.blocked !== undefined && this.blocked !== null) {
        }
        if (this.blockedMyStoriesFrom !== undefined && this.blockedMyStoriesFrom !== null) {
        }
        writer.writeLargeInt(this.userId, 64);
        writer.writeInt(this.date);
        if (this.reaction !== undefined && this.reaction !== null) {
            writer.write(this.reaction.getBytes());
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): StoryView {
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
        const _userId = reader.readLargeInt(64);
        args.userId = _userId;
        const _date = reader.readInt();
        args.date = _date;
        if (args.flags & (1 << 2)) {
            const _reaction = reader.tgReadObject();
            args.reaction = _reaction;
        } else {
            args.reaction = undefined;
        }
        return new StoryView(args);
    }
}