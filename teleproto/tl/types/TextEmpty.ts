import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class TextEmpty extends TLObject {
    static CONSTRUCTOR_ID = 3695018575;
    static SUBCLASS_OF_ID = 4056986745;
    static className = "TextEmpty";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3695018575, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): TextEmpty {
        const args: any = {};
        return new TextEmpty(args);
    }
}