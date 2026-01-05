import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class UpdateLoginToken extends TLObject {
    static CONSTRUCTOR_ID = 1448076945;
    static SUBCLASS_OF_ID = 2676568142;
    static className = "UpdateLoginToken";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1448076945, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): UpdateLoginToken {
        const args: any = {};
        return new UpdateLoginToken(args);
    }
}