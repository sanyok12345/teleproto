import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class SendMessageCancelAction extends TLObject {
    static CONSTRUCTOR_ID = 4250847477;
    static SUBCLASS_OF_ID = 548588577;
    static className = "SendMessageCancelAction";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(4250847477, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): SendMessageCancelAction {
        const args: any = {};
        return new SendMessageCancelAction(args);
    }
}