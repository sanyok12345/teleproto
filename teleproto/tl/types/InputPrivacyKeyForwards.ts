import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class InputPrivacyKeyForwards extends TLObject {
    static CONSTRUCTOR_ID = 2765966344;
    static SUBCLASS_OF_ID = 87435256;
    static className = "InputPrivacyKeyForwards";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2765966344, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputPrivacyKeyForwards {
        const args: any = {};
        return new InputPrivacyKeyForwards(args);
    }
}