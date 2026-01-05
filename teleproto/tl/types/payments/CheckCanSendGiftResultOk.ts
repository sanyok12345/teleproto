import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";

export class CheckCanSendGiftResultOk extends TLObject {
    static CONSTRUCTOR_ID = 927967149;
    static SUBCLASS_OF_ID = 1664023088;
    static className = "payments.CheckCanSendGiftResultOk";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(927967149, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): CheckCanSendGiftResultOk {
        const args: any = {};
        return new CheckCanSendGiftResultOk(args);
    }
}