import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeTodoList } from "./TypeTodoList";
import { TypeTodoCompletion } from "./TypeTodoCompletion";

export class MessageMediaToDo extends TLObject {
    static CONSTRUCTOR_ID = 2320740372;
    static SUBCLASS_OF_ID = 1198308914;
    static className = "MessageMediaToDo";
    static classType = "constructor";

    flags!: number;
    todo!: TypeTodoList;
    completions?: TypeTodoCompletion[];

    constructor(args: { flags?: number, todo?: TypeTodoList, completions?: TypeTodoCompletion[] } = {}) {
        super();
        this.flags = args.flags!;
        this.todo = args.todo!;
        this.completions = args.completions;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2320740372, false);
        let flags = 0;
        if (this.completions !== undefined && this.completions !== null) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        writer.write(this.todo.getBytes());
        if (this.completions !== undefined && this.completions !== null) {
            writer.writeVector(this.completions, (item) => {
                writer.write(item.getBytes());
            });
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): MessageMediaToDo {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        const _todo = reader.tgReadObject();
        args.todo = _todo;
        if (args.flags & (1 << 0)) {
            const _completions = reader.readVector((reader) => {
                const item = reader.tgReadObject();
                return item;
            });
            args.completions = _completions;
        } else {
            args.completions = undefined;
        }
        return new MessageMediaToDo(args);
    }
}