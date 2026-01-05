import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class InputMessagesFilterUrl extends TLObject {
    static CONSTRUCTOR_ID = 2129714567;
    static SUBCLASS_OF_ID = 2318855188;
    static className = "InputMessagesFilterUrl";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2129714567, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputMessagesFilterUrl {
        const args: any = {};
        return new InputMessagesFilterUrl(args);
    }
}