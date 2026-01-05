import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";

export class AvailableEffectsNotModified extends TLObject {
    static CONSTRUCTOR_ID = 3522009691;
    static SUBCLASS_OF_ID = 1148245437;
    static className = "messages.AvailableEffectsNotModified";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3522009691, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): AvailableEffectsNotModified {
        const args: any = {};
        return new AvailableEffectsNotModified(args);
    }
}