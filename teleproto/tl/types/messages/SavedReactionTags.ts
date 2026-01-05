import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";
import { TypeSavedReactionTag } from "../TypeSavedReactionTag";

export class SavedReactionTags extends TLObject {
    static CONSTRUCTOR_ID = 844731658;
    static SUBCLASS_OF_ID = 2744867811;
    static className = "messages.SavedReactionTags";
    static classType = "constructor";

    tags!: TypeSavedReactionTag[];
    hash!: bigint;

    constructor(args: { tags?: TypeSavedReactionTag[], hash?: bigint } = {}) {
        super();
        this.tags = args.tags!;
        this.hash = args.hash!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(844731658, false);
        writer.writeVector(this.tags, (item) => {
            writer.write(item.getBytes());
        });
        writer.writeLargeInt(this.hash, 64);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): SavedReactionTags {
        const args: any = {};
        const _tags = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.tags = _tags;
        const _hash = reader.readLargeInt(64);
        args.hash = _hash;
        return new SavedReactionTags(args);
    }
}