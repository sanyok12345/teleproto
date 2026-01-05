import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class NotifyChats extends TLObject {
    static CONSTRUCTOR_ID = 3221737155;
    static SUBCLASS_OF_ID = 3756548142;
    static className = "NotifyChats";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3221737155, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): NotifyChats {
        const args: any = {};
        return new NotifyChats(args);
    }
}