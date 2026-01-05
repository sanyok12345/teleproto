import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class JsonNull extends TLObject {
    static CONSTRUCTOR_ID = 1064139624;
    static SUBCLASS_OF_ID = 3952707507;
    static className = "JsonNull";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1064139624, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): JsonNull {
        const args: any = {};
        return new JsonNull(args);
    }
}