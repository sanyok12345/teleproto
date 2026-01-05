import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class SendMessageRecordVideoAction extends TLObject {
    static CONSTRUCTOR_ID = 2710034031;
    static SUBCLASS_OF_ID = 548588577;
    static className = "SendMessageRecordVideoAction";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2710034031, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): SendMessageRecordVideoAction {
        const args: any = {};
        return new SendMessageRecordVideoAction(args);
    }
}