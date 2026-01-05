import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class UpdateAutoSaveSettings extends TLObject {
    static CONSTRUCTOR_ID = 3959795863;
    static SUBCLASS_OF_ID = 2676568142;
    static className = "UpdateAutoSaveSettings";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3959795863, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): UpdateAutoSaveSettings {
        const args: any = {};
        return new UpdateAutoSaveSettings(args);
    }
}