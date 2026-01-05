import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class BotCommandScopeChats extends TLObject {
    static CONSTRUCTOR_ID = 1877059713;
    static SUBCLASS_OF_ID = 1269783824;
    static className = "BotCommandScopeChats";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1877059713, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): BotCommandScopeChats {
        const args: any = {};
        return new BotCommandScopeChats(args);
    }
}