import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class MessageActionTodoCompletions extends TLObject {
    static CONSTRUCTOR_ID = 3430702217;
    static SUBCLASS_OF_ID = 2256589094;
    static className = "MessageActionTodoCompletions";
    static classType = "constructor";

    completed!: number[];
    incompleted!: number[];

    constructor(args: { completed?: number[], incompleted?: number[] } = {}) {
        super();
        this.completed = args.completed!;
        this.incompleted = args.incompleted!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3430702217, false);
        writer.writeVector(this.completed, (item) => {
            writer.writeInt(item);
        });
        writer.writeVector(this.incompleted, (item) => {
            writer.writeInt(item);
        });
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): MessageActionTodoCompletions {
        const args: any = {};
        const _completed = reader.readVector((reader) => {
            const item = reader.readInt();
            return item;
        });
        args.completed = _completed;
        const _incompleted = reader.readVector((reader) => {
            const item = reader.readInt();
            return item;
        });
        args.incompleted = _incompleted;
        return new MessageActionTodoCompletions(args);
    }
}