import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";
import { TypeReaction } from "../TypeReaction";

export class Reactions extends TLObject {
    static CONSTRUCTOR_ID = 3942512406;
    static SUBCLASS_OF_ID = 2915271460;
    static className = "messages.Reactions";
    static classType = "constructor";

    hash!: bigint;
    reactions!: TypeReaction[];

    constructor(args: { hash?: bigint, reactions?: TypeReaction[] } = {}) {
        super();
        this.hash = args.hash!;
        this.reactions = args.reactions!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3942512406, false);
        writer.writeLargeInt(this.hash, 64);
        writer.writeVector(this.reactions, (item) => {
            writer.write(item.getBytes());
        });
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): Reactions {
        const args: any = {};
        const _hash = reader.readLargeInt(64);
        args.hash = _hash;
        const _reactions = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.reactions = _reactions;
        return new Reactions(args);
    }
}