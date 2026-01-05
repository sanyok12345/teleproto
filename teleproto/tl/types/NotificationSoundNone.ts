import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class NotificationSoundNone extends TLObject {
    static CONSTRUCTOR_ID = 1863070943;
    static SUBCLASS_OF_ID = 4076201307;
    static className = "NotificationSoundNone";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1863070943, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): NotificationSoundNone {
        const args: any = {};
        return new NotificationSoundNone(args);
    }
}