import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class SendMessageGeoLocationAction extends TLObject {
    static CONSTRUCTOR_ID = 393186209;
    static SUBCLASS_OF_ID = 548588577;
    static className = "SendMessageGeoLocationAction";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(393186209, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): SendMessageGeoLocationAction {
        const args: any = {};
        return new SendMessageGeoLocationAction(args);
    }
}