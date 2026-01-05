import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class InputNotifyChats extends TLObject {
    static CONSTRUCTOR_ID = 1251338318;
    static SUBCLASS_OF_ID = 1486362133;
    static className = "InputNotifyChats";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1251338318, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputNotifyChats {
        const args: any = {};
        return new InputNotifyChats(args);
    }
}