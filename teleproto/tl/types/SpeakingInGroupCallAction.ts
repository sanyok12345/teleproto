import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class SpeakingInGroupCallAction extends TLObject {
    static CONSTRUCTOR_ID = 3643548293;
    static SUBCLASS_OF_ID = 548588577;
    static className = "SpeakingInGroupCallAction";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3643548293, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): SpeakingInGroupCallAction {
        const args: any = {};
        return new SpeakingInGroupCallAction(args);
    }
}