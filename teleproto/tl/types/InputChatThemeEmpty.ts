import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class InputChatThemeEmpty extends TLObject {
    static CONSTRUCTOR_ID = 2200339587;
    static SUBCLASS_OF_ID = 1462324836;
    static className = "InputChatThemeEmpty";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2200339587, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputChatThemeEmpty {
        const args: any = {};
        return new InputChatThemeEmpty(args);
    }
}