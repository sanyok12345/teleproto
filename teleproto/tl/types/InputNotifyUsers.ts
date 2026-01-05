import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class InputNotifyUsers extends TLObject {
    static CONSTRUCTOR_ID = 423314455;
    static SUBCLASS_OF_ID = 1486362133;
    static className = "InputNotifyUsers";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(423314455, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputNotifyUsers {
        const args: any = {};
        return new InputNotifyUsers(args);
    }
}