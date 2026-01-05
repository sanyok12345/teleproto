import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class UpdateAttachMenuBots extends TLObject {
    static CONSTRUCTOR_ID = 397910539;
    static SUBCLASS_OF_ID = 2676568142;
    static className = "UpdateAttachMenuBots";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(397910539, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): UpdateAttachMenuBots {
        const args: any = {};
        return new UpdateAttachMenuBots(args);
    }
}