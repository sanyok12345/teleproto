import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class DefaultHistoryTTL extends TLObject {
    static CONSTRUCTOR_ID = 1135897376;
    static SUBCLASS_OF_ID = 4027396967;
    static className = "DefaultHistoryTTL";
    static classType = "constructor";

    period!: number;

    constructor(args: { period?: number } = {}) {
        super();
        this.period = args.period!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1135897376, false);
        writer.writeInt(this.period);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): DefaultHistoryTTL {
        const args: any = {};
        const _period = reader.readInt();
        args.period = _period;
        return new DefaultHistoryTTL(args);
    }
}