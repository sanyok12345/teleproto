import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class InputTakeoutFileLocation extends TLObject {
    static CONSTRUCTOR_ID = 700340377;
    static SUBCLASS_OF_ID = 354669666;
    static className = "InputTakeoutFileLocation";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(700340377, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputTakeoutFileLocation {
        const args: any = {};
        return new InputTakeoutFileLocation(args);
    }
}