import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class NotifyBroadcasts extends TLObject {
    static CONSTRUCTOR_ID = 3591563503;
    static SUBCLASS_OF_ID = 3756548142;
    static className = "NotifyBroadcasts";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3591563503, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): NotifyBroadcasts {
        const args: any = {};
        return new NotifyBroadcasts(args);
    }
}