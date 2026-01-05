import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class UpdateContactsReset extends TLObject {
    static CONSTRUCTOR_ID = 1887741886;
    static SUBCLASS_OF_ID = 2676568142;
    static className = "UpdateContactsReset";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1887741886, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): UpdateContactsReset {
        const args: any = {};
        return new UpdateContactsReset(args);
    }
}