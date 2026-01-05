import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class SendMessageChooseContactAction extends TLObject {
    static CONSTRUCTOR_ID = 1653390447;
    static SUBCLASS_OF_ID = 548588577;
    static className = "SendMessageChooseContactAction";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1653390447, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): SendMessageChooseContactAction {
        const args: any = {};
        return new SendMessageChooseContactAction(args);
    }
}