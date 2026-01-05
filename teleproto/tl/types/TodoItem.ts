import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeTextWithEntities } from "./TypeTextWithEntities";

export class TodoItem extends TLObject {
    static CONSTRUCTOR_ID = 3416892719;
    static SUBCLASS_OF_ID = 3755665077;
    static className = "TodoItem";
    static classType = "constructor";

    id!: number;
    title!: TypeTextWithEntities;

    constructor(args: { id?: number, title?: TypeTextWithEntities } = {}) {
        super();
        this.id = args.id!;
        this.title = args.title!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3416892719, false);
        writer.writeInt(this.id);
        writer.write(this.title.getBytes());
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): TodoItem {
        const args: any = {};
        const _id = reader.readInt();
        args.id = _id;
        const _title = reader.tgReadObject();
        args.title = _title;
        return new TodoItem(args);
    }
}