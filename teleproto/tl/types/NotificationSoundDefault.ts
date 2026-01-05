import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class NotificationSoundDefault extends TLObject {
    static CONSTRUCTOR_ID = 2548612798;
    static SUBCLASS_OF_ID = 4076201307;
    static className = "NotificationSoundDefault";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2548612798, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): NotificationSoundDefault {
        const args: any = {};
        return new NotificationSoundDefault(args);
    }
}