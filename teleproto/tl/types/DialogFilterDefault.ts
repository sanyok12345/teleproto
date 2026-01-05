import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class DialogFilterDefault extends TLObject {
    static CONSTRUCTOR_ID = 909284270;
    static SUBCLASS_OF_ID = 1764475991;
    static className = "DialogFilterDefault";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(909284270, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): DialogFilterDefault {
        const args: any = {};
        return new DialogFilterDefault(args);
    }
}