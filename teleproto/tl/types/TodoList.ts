import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeTextWithEntities } from "./TypeTextWithEntities";
import { TypeTodoItem } from "./TypeTodoItem";

export class TodoList extends TLObject {
    static CONSTRUCTOR_ID = 1236871718;
    static SUBCLASS_OF_ID = 2215197619;
    static className = "TodoList";
    static classType = "constructor";

    flags!: number;
    othersCanAppend?: boolean;
    othersCanComplete?: boolean;
    title!: TypeTextWithEntities;
    list!: TypeTodoItem[];

    constructor(args: { flags?: number, othersCanAppend?: boolean, othersCanComplete?: boolean, title?: TypeTextWithEntities, list?: TypeTodoItem[] } = {}) {
        super();
        this.flags = args.flags!;
        this.othersCanAppend = args.othersCanAppend;
        this.othersCanComplete = args.othersCanComplete;
        this.title = args.title!;
        this.list = args.list!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1236871718, false);
        let flags = 0;
        if (this.othersCanAppend) { flags |= 1 << 0; }
        if (this.othersCanComplete) { flags |= 1 << 1; }
        writer.writeInt(flags, false);
        if (this.othersCanAppend !== undefined && this.othersCanAppend !== null) {
        }
        if (this.othersCanComplete !== undefined && this.othersCanComplete !== null) {
        }
        writer.write(this.title.getBytes());
        writer.writeVector(this.list, (item) => {
            writer.write(item.getBytes());
        });
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): TodoList {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _othersCanAppend = true;
            args.othersCanAppend = _othersCanAppend;
        } else {
            args.othersCanAppend = false;
        }
        if (args.flags & (1 << 1)) {
            const _othersCanComplete = true;
            args.othersCanComplete = _othersCanComplete;
        } else {
            args.othersCanComplete = false;
        }
        const _title = reader.tgReadObject();
        args.title = _title;
        const _list = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.list = _list;
        return new TodoList(args);
    }
}