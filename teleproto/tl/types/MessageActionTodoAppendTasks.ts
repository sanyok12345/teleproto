import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeTodoItem } from "./TypeTodoItem";

export class MessageActionTodoAppendTasks extends TLObject {
    static CONSTRUCTOR_ID = 3354246275;
    static SUBCLASS_OF_ID = 2256589094;
    static className = "MessageActionTodoAppendTasks";
    static classType = "constructor";

    list!: TypeTodoItem[];

    constructor(args: { list?: TypeTodoItem[] } = {}) {
        super();
        this.list = args.list!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3354246275, false);
        writer.writeVector(this.list, (item) => {
            writer.write(item.getBytes());
        });
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): MessageActionTodoAppendTasks {
        const args: any = {};
        const _list = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.list = _list;
        return new MessageActionTodoAppendTasks(args);
    }
}