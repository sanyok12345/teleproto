import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeReaction } from "./TypeReaction";

export class SavedReactionTag extends TLObject {
    static CONSTRUCTOR_ID = 3413112872;
    static SUBCLASS_OF_ID = 3983021080;
    static className = "SavedReactionTag";
    static classType = "constructor";

    flags!: number;
    reaction!: TypeReaction;
    title?: string;
    count!: number;

    constructor(args: { flags?: number, reaction?: TypeReaction, title?: string, count?: number } = {}) {
        super();
        this.flags = args.flags!;
        this.reaction = args.reaction!;
        this.title = args.title;
        this.count = args.count!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3413112872, false);
        let flags = 0;
        if (this.title !== undefined && this.title !== null) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        writer.write(this.reaction.getBytes());
        if (this.title !== undefined && this.title !== null) {
            writer.tgWriteString(this.title);
        }
        writer.writeInt(this.count);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): SavedReactionTag {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        const _reaction = reader.tgReadObject();
        args.reaction = _reaction;
        if (args.flags & (1 << 0)) {
            const _title = reader.tgReadString();
            args.title = _title;
        } else {
            args.title = undefined;
        }
        const _count = reader.readInt();
        args.count = _count;
        return new SavedReactionTag(args);
    }
}