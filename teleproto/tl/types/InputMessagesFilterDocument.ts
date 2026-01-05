import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class InputMessagesFilterDocument extends TLObject {
    static CONSTRUCTOR_ID = 2665345416;
    static SUBCLASS_OF_ID = 2318855188;
    static className = "InputMessagesFilterDocument";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2665345416, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputMessagesFilterDocument {
        const args: any = {};
        return new InputMessagesFilterDocument(args);
    }
}