import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class SendMessageChooseStickerAction extends TLObject {
    static CONSTRUCTOR_ID = 2958739121;
    static SUBCLASS_OF_ID = 548588577;
    static className = "SendMessageChooseStickerAction";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2958739121, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): SendMessageChooseStickerAction {
        const args: any = {};
        return new SendMessageChooseStickerAction(args);
    }
}