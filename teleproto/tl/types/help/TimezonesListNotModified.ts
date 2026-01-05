import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";

export class TimezonesListNotModified extends TLObject {
    static CONSTRUCTOR_ID = 2533820620;
    static SUBCLASS_OF_ID = 3396789365;
    static className = "help.TimezonesListNotModified";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2533820620, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): TimezonesListNotModified {
        const args: any = {};
        return new TimezonesListNotModified(args);
    }
}