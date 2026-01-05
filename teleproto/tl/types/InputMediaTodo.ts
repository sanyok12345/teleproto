import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeTodoList } from "./TypeTodoList";

export class InputMediaTodo extends TLObject {
    static CONSTRUCTOR_ID = 2680512478;
    static SUBCLASS_OF_ID = 4210575092;
    static className = "InputMediaTodo";
    static classType = "constructor";

    todo!: TypeTodoList;

    constructor(args: { todo?: TypeTodoList } = {}) {
        super();
        this.todo = args.todo!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2680512478, false);
        writer.write(this.todo.getBytes());
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputMediaTodo {
        const args: any = {};
        const _todo = reader.tgReadObject();
        args.todo = _todo;
        return new InputMediaTodo(args);
    }
}