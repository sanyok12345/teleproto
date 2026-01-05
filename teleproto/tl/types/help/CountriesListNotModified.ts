import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";

export class CountriesListNotModified extends TLObject {
    static CONSTRUCTOR_ID = 2479628082;
    static SUBCLASS_OF_ID = 3929144968;
    static className = "help.CountriesListNotModified";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2479628082, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): CountriesListNotModified {
        const args: any = {};
        return new CountriesListNotModified(args);
    }
}