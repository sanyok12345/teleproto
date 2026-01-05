import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class InputMessagesFilterGif extends TLObject {
    static CONSTRUCTOR_ID = 4291323271;
    static SUBCLASS_OF_ID = 2318855188;
    static className = "InputMessagesFilterGif";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(4291323271, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputMessagesFilterGif {
        const args: any = {};
        return new InputMessagesFilterGif(args);
    }
}