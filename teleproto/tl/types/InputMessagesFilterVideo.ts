import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class InputMessagesFilterVideo extends TLObject {
    static CONSTRUCTOR_ID = 2680163941;
    static SUBCLASS_OF_ID = 2318855188;
    static className = "InputMessagesFilterVideo";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2680163941, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputMessagesFilterVideo {
        const args: any = {};
        return new InputMessagesFilterVideo(args);
    }
}