import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class DataJSON extends TLObject {
    static CONSTRUCTOR_ID = 2104790276;
    static SUBCLASS_OF_ID = 2902676200;
    static className = "DataJSON";
    static classType = "constructor";

    data!: string;

    constructor(args: { data?: string } = {}) {
        super();
        this.data = args.data!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2104790276, false);
        writer.tgWriteString(this.data);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): DataJSON {
        const args: any = {};
        const _data = reader.tgReadString();
        args.data = _data;
        return new DataJSON(args);
    }
}