import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class InputChannelEmpty extends TLObject {
    static CONSTRUCTOR_ID = 4002160262;
    static SUBCLASS_OF_ID = 1089602301;
    static className = "InputChannelEmpty";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(4002160262, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputChannelEmpty {
        const args: any = {};
        return new InputChannelEmpty(args);
    }
}