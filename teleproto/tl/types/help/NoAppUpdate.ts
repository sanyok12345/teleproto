import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";

export class NoAppUpdate extends TLObject {
    static CONSTRUCTOR_ID = 3294258486;
    static SUBCLASS_OF_ID = 1486292638;
    static className = "help.NoAppUpdate";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3294258486, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): NoAppUpdate {
        const args: any = {};
        return new NoAppUpdate(args);
    }
}