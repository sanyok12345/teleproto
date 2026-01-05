import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeJSONValue } from "./TypeJSONValue";

export class JsonArray extends TLObject {
    static CONSTRUCTOR_ID = 4148447075;
    static SUBCLASS_OF_ID = 3952707507;
    static className = "JsonArray";
    static classType = "constructor";

    value!: TypeJSONValue[];

    constructor(args: { value?: TypeJSONValue[] } = {}) {
        super();
        this.value = args.value!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(4148447075, false);
        writer.writeVector(this.value, (item) => {
            writer.write(item.getBytes());
        });
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): JsonArray {
        const args: any = {};
        const _value = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.value = _value;
        return new JsonArray(args);
    }
}