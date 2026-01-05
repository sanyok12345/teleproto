import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class SendMessageRecordRoundAction extends TLObject {
    static CONSTRUCTOR_ID = 2297593788;
    static SUBCLASS_OF_ID = 548588577;
    static className = "SendMessageRecordRoundAction";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2297593788, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): SendMessageRecordRoundAction {
        const args: any = {};
        return new SendMessageRecordRoundAction(args);
    }
}