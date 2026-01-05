import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class MessageRange extends TLObject {
    static CONSTRUCTOR_ID = 182649427;
    static SUBCLASS_OF_ID = 3200730487;
    static className = "MessageRange";
    static classType = "constructor";

    minId!: number;
    maxId!: number;

    constructor(args: { minId?: number, maxId?: number } = {}) {
        super();
        this.minId = args.minId!;
        this.maxId = args.maxId!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(182649427, false);
        writer.writeInt(this.minId);
        writer.writeInt(this.maxId);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): MessageRange {
        const args: any = {};
        const _minId = reader.readInt();
        args.minId = _minId;
        const _maxId = reader.readInt();
        args.maxId = _maxId;
        return new MessageRange(args);
    }
}