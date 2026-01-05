import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class ForumTopicDeleted extends TLObject {
    static CONSTRUCTOR_ID = 37687451;
    static SUBCLASS_OF_ID = 2367169027;
    static className = "ForumTopicDeleted";
    static classType = "constructor";

    id!: number;

    constructor(args: { id?: number } = {}) {
        super();
        this.id = args.id!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(37687451, false);
        writer.writeInt(this.id);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): ForumTopicDeleted {
        const args: any = {};
        const _id = reader.readInt();
        args.id = _id;
        return new ForumTopicDeleted(args);
    }
}