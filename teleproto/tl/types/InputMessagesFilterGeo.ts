import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class InputMessagesFilterGeo extends TLObject {
    static CONSTRUCTOR_ID = 3875695885;
    static SUBCLASS_OF_ID = 2318855188;
    static className = "InputMessagesFilterGeo";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3875695885, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputMessagesFilterGeo {
        const args: any = {};
        return new InputMessagesFilterGeo(args);
    }
}