import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class StoryItemDeleted extends TLObject {
    static CONSTRUCTOR_ID = 1374088783;
    static SUBCLASS_OF_ID = 3564613939;
    static className = "StoryItemDeleted";
    static classType = "constructor";

    id!: number;

    constructor(args: { id?: number } = {}) {
        super();
        this.id = args.id!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1374088783, false);
        writer.writeInt(this.id);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): StoryItemDeleted {
        const args: any = {};
        const _id = reader.readInt();
        args.id = _id;
        return new StoryItemDeleted(args);
    }
}