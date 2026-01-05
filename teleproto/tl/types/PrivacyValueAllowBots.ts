import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class PrivacyValueAllowBots extends TLObject {
    static CONSTRUCTOR_ID = 558242653;
    static SUBCLASS_OF_ID = 3954700912;
    static className = "PrivacyValueAllowBots";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(558242653, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): PrivacyValueAllowBots {
        const args: any = {};
        return new PrivacyValueAllowBots(args);
    }
}