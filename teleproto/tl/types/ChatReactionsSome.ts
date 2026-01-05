import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeReaction } from "./TypeReaction";

export class ChatReactionsSome extends TLObject {
    static CONSTRUCTOR_ID = 1713193015;
    static SUBCLASS_OF_ID = 320742581;
    static className = "ChatReactionsSome";
    static classType = "constructor";

    reactions!: TypeReaction[];

    constructor(args: { reactions?: TypeReaction[] } = {}) {
        super();
        this.reactions = args.reactions!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1713193015, false);
        writer.writeVector(this.reactions, (item) => {
            writer.write(item.getBytes());
        });
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): ChatReactionsSome {
        const args: any = {};
        const _reactions = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.reactions = _reactions;
        return new ChatReactionsSome(args);
    }
}