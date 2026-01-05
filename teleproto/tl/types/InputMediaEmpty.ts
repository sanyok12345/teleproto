import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class InputMediaEmpty extends TLObject {
    static CONSTRUCTOR_ID = 2523198847;
    static SUBCLASS_OF_ID = 4210575092;
    static className = "InputMediaEmpty";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2523198847, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputMediaEmpty {
        const args: any = {};
        return new InputMediaEmpty(args);
    }
}