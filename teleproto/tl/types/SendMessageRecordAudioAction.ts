import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class SendMessageRecordAudioAction extends TLObject {
    static CONSTRUCTOR_ID = 3576656887;
    static SUBCLASS_OF_ID = 548588577;
    static className = "SendMessageRecordAudioAction";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3576656887, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): SendMessageRecordAudioAction {
        const args: any = {};
        return new SendMessageRecordAudioAction(args);
    }
}