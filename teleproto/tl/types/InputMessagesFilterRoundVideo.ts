import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class InputMessagesFilterRoundVideo extends TLObject {
    static CONSTRUCTOR_ID = 3041516115;
    static SUBCLASS_OF_ID = 2318855188;
    static className = "InputMessagesFilterRoundVideo";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3041516115, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputMessagesFilterRoundVideo {
        const args: any = {};
        return new InputMessagesFilterRoundVideo(args);
    }
}