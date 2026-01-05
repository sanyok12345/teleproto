import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class StatsGraphError extends TLObject {
    static CONSTRUCTOR_ID = 3202127906;
    static SUBCLASS_OF_ID = 2609918291;
    static className = "StatsGraphError";
    static classType = "constructor";

    error!: string;

    constructor(args: { error?: string } = {}) {
        super();
        this.error = args.error!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3202127906, false);
        writer.tgWriteString(this.error);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): StatsGraphError {
        const args: any = {};
        const _error = reader.tgReadString();
        args.error = _error;
        return new StatsGraphError(args);
    }
}