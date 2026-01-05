import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class InputDocumentEmpty extends TLObject {
    static CONSTRUCTOR_ID = 1928391342;
    static SUBCLASS_OF_ID = 4081048424;
    static className = "InputDocumentEmpty";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1928391342, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputDocumentEmpty {
        const args: any = {};
        return new InputDocumentEmpty(args);
    }
}