import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeReaction } from "./TypeReaction";

export class ReactionCount extends TLObject {
    static CONSTRUCTOR_ID = 2748435328;
    static SUBCLASS_OF_ID = 3523792447;
    static className = "ReactionCount";
    static classType = "constructor";

    flags!: number;
    chosenOrder?: number;
    reaction!: TypeReaction;
    count!: number;

    constructor(args: { flags?: number, chosenOrder?: number, reaction?: TypeReaction, count?: number } = {}) {
        super();
        this.flags = args.flags!;
        this.chosenOrder = args.chosenOrder;
        this.reaction = args.reaction!;
        this.count = args.count!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2748435328, false);
        let flags = 0;
        if (this.chosenOrder !== undefined && this.chosenOrder !== null) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        if (this.chosenOrder !== undefined && this.chosenOrder !== null) {
            writer.writeInt(this.chosenOrder);
        }
        writer.write(this.reaction.getBytes());
        writer.writeInt(this.count);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): ReactionCount {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _chosenOrder = reader.readInt();
            args.chosenOrder = _chosenOrder;
        } else {
            args.chosenOrder = undefined;
        }
        const _reaction = reader.tgReadObject();
        args.reaction = _reaction;
        const _count = reader.readInt();
        args.count = _count;
        return new ReactionCount(args);
    }
}