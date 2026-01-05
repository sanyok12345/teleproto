import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class JsonBool extends TLObject {
    static CONSTRUCTOR_ID = 3342098026;
    static SUBCLASS_OF_ID = 3952707507;
    static className = "JsonBool";
    static classType = "constructor";

    value!: boolean;

    constructor(args: { value?: boolean } = {}) {
        super();
        this.value = args.value!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3342098026, false);
        writer.tgWriteBool(this.value);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): JsonBool {
        const args: any = {};
        const _value = reader.tgReadBool();
        args.value = _value;
        return new JsonBool(args);
    }
}