import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypePeer } from "./TypePeer";

export class TodoCompletion extends TLObject {
    static CONSTRUCTOR_ID = 572241380;
    static SUBCLASS_OF_ID = 3135658875;
    static className = "TodoCompletion";
    static classType = "constructor";

    id!: number;
    completedBy!: TypePeer;
    date!: number;

    constructor(args: { id?: number, completedBy?: TypePeer, date?: number } = {}) {
        super();
        this.id = args.id!;
        this.completedBy = args.completedBy!;
        this.date = args.date!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(572241380, false);
        writer.writeInt(this.id);
        writer.write(this.completedBy.getBytes());
        writer.writeInt(this.date);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): TodoCompletion {
        const args: any = {};
        const _id = reader.readInt();
        args.id = _id;
        const _completedBy = reader.tgReadObject();
        args.completedBy = _completedBy;
        const _date = reader.readInt();
        args.date = _date;
        return new TodoCompletion(args);
    }
}