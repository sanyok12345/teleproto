import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class InputMessagesFilterPhotos extends TLObject {
    static CONSTRUCTOR_ID = 2517214492;
    static SUBCLASS_OF_ID = 2318855188;
    static className = "InputMessagesFilterPhotos";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2517214492, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputMessagesFilterPhotos {
        const args: any = {};
        return new InputMessagesFilterPhotos(args);
    }
}