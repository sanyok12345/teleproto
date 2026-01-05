import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class JsonNumber extends TLObject {
    static CONSTRUCTOR_ID = 736157604;
    static SUBCLASS_OF_ID = 3952707507;
    static className = "JsonNumber";
    static classType = "constructor";

    value!: number;

    constructor(args: { value?: number } = {}) {
        super();
        this.value = args.value!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(736157604, false);
        writer.writeDouble(this.value);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): JsonNumber {
        const args: any = {};
        const _value = reader.readDouble();
        args.value = _value;
        return new JsonNumber(args);
    }
}