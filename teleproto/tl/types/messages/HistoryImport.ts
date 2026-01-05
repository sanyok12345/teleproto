import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";

export class HistoryImport extends TLObject {
    static CONSTRUCTOR_ID = 375566091;
    static SUBCLASS_OF_ID = 2978723082;
    static className = "messages.HistoryImport";
    static classType = "constructor";

    id!: bigint;

    constructor(args: { id?: bigint } = {}) {
        super();
        this.id = args.id!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(375566091, false);
        writer.writeLargeInt(this.id, 64);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): HistoryImport {
        const args: any = {};
        const _id = reader.readLargeInt(64);
        args.id = _id;
        return new HistoryImport(args);
    }
}