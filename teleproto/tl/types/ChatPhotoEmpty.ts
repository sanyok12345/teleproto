import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class ChatPhotoEmpty extends TLObject {
    static CONSTRUCTOR_ID = 935395612;
    static SUBCLASS_OF_ID = 2889794789;
    static className = "ChatPhotoEmpty";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(935395612, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): ChatPhotoEmpty {
        const args: any = {};
        return new ChatPhotoEmpty(args);
    }
}