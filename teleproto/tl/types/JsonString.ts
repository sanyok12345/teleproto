import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class JsonString extends TLObject {
    static CONSTRUCTOR_ID = 3072226938;
    static SUBCLASS_OF_ID = 3952707507;
    static className = "JsonString";
    static classType = "constructor";

    value!: string;

    constructor(args: { value?: string } = {}) {
        super();
        this.value = args.value!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3072226938, false);
        writer.tgWriteString(this.value);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): JsonString {
        const args: any = {};
        const _value = reader.tgReadString();
        args.value = _value;
        return new JsonString(args);
    }
}