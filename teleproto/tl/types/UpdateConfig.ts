import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class UpdateConfig extends TLObject {
    static CONSTRUCTOR_ID = 2720652550;
    static SUBCLASS_OF_ID = 2676568142;
    static className = "UpdateConfig";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2720652550, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): UpdateConfig {
        const args: any = {};
        return new UpdateConfig(args);
    }
}