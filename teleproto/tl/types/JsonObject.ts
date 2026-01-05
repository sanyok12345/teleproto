import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeJSONObjectValue } from "./TypeJSONObjectValue";

export class JsonObject extends TLObject {
    static CONSTRUCTOR_ID = 2579616925;
    static SUBCLASS_OF_ID = 3952707507;
    static className = "JsonObject";
    static classType = "constructor";

    value!: TypeJSONObjectValue[];

    constructor(args: { value?: TypeJSONObjectValue[] } = {}) {
        super();
        this.value = args.value!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2579616925, false);
        writer.writeVector(this.value, (item) => {
            writer.write(item.getBytes());
        });
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): JsonObject {
        const args: any = {};
        const _value = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.value = _value;
        return new JsonObject(args);
    }
}