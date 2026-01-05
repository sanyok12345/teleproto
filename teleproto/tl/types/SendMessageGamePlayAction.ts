import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class SendMessageGamePlayAction extends TLObject {
    static CONSTRUCTOR_ID = 3714748232;
    static SUBCLASS_OF_ID = 548588577;
    static className = "SendMessageGamePlayAction";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3714748232, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): SendMessageGamePlayAction {
        const args: any = {};
        return new SendMessageGamePlayAction(args);
    }
}