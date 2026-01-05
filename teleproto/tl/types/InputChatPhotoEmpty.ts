import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class InputChatPhotoEmpty extends TLObject {
    static CONSTRUCTOR_ID = 480546647;
    static SUBCLASS_OF_ID = 3572182388;
    static className = "InputChatPhotoEmpty";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(480546647, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputChatPhotoEmpty {
        const args: any = {};
        return new InputChatPhotoEmpty(args);
    }
}