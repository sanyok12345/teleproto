import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class InputNotifyBroadcasts extends TLObject {
    static CONSTRUCTOR_ID = 2983951486;
    static SUBCLASS_OF_ID = 1486362133;
    static className = "InputNotifyBroadcasts";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2983951486, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputNotifyBroadcasts {
        const args: any = {};
        return new InputNotifyBroadcasts(args);
    }
}