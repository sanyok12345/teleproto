import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class InputMessagesFilterPhotoVideo extends TLObject {
    static CONSTRUCTOR_ID = 1458172132;
    static SUBCLASS_OF_ID = 2318855188;
    static className = "InputMessagesFilterPhotoVideo";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1458172132, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputMessagesFilterPhotoVideo {
        const args: any = {};
        return new InputMessagesFilterPhotoVideo(args);
    }
}