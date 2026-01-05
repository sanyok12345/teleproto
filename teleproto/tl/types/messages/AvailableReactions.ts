import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";
import { TypeAvailableReaction } from "../TypeAvailableReaction";

export class AvailableReactions extends TLObject {
    static CONSTRUCTOR_ID = 1989032621;
    static SUBCLASS_OF_ID = 3827740034;
    static className = "messages.AvailableReactions";
    static classType = "constructor";

    hash!: number;
    reactions!: TypeAvailableReaction[];

    constructor(args: { hash?: number, reactions?: TypeAvailableReaction[] } = {}) {
        super();
        this.hash = args.hash!;
        this.reactions = args.reactions!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1989032621, false);
        writer.writeInt(this.hash);
        writer.writeVector(this.reactions, (item) => {
            writer.write(item.getBytes());
        });
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): AvailableReactions {
        const args: any = {};
        const _hash = reader.readInt();
        args.hash = _hash;
        const _reactions = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.reactions = _reactions;
        return new AvailableReactions(args);
    }
}