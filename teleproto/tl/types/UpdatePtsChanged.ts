import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class UpdatePtsChanged extends TLObject {
    static CONSTRUCTOR_ID = 861169551;
    static SUBCLASS_OF_ID = 2676568142;
    static className = "UpdatePtsChanged";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(861169551, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): UpdatePtsChanged {
        const args: any = {};
        return new UpdatePtsChanged(args);
    }
}