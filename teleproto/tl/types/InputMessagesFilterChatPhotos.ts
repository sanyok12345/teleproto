import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class InputMessagesFilterChatPhotos extends TLObject {
    static CONSTRUCTOR_ID = 975236280;
    static SUBCLASS_OF_ID = 2318855188;
    static className = "InputMessagesFilterChatPhotos";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(975236280, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputMessagesFilterChatPhotos {
        const args: any = {};
        return new InputMessagesFilterChatPhotos(args);
    }
}