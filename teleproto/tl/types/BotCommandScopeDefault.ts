import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class BotCommandScopeDefault extends TLObject {
    static CONSTRUCTOR_ID = 795652779;
    static SUBCLASS_OF_ID = 1269783824;
    static className = "BotCommandScopeDefault";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(795652779, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): BotCommandScopeDefault {
        const args: any = {};
        return new BotCommandScopeDefault(args);
    }
}