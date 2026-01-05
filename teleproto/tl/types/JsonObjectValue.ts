import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeJSONValue } from "./TypeJSONValue";

export class JsonObjectValue extends TLObject {
    static CONSTRUCTOR_ID = 3235781593;
    static SUBCLASS_OF_ID = 2474626745;
    static className = "JsonObjectValue";
    static classType = "constructor";

    key!: string;
    value!: TypeJSONValue;

    constructor(args: { key?: string, value?: TypeJSONValue } = {}) {
        super();
        this.key = args.key!;
        this.value = args.value!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3235781593, false);
        writer.tgWriteString(this.key);
        writer.write(this.value.getBytes());
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): JsonObjectValue {
        const args: any = {};
        const _key = reader.tgReadString();
        args.key = _key;
        const _value = reader.tgReadObject();
        args.value = _value;
        return new JsonObjectValue(args);
    }
}