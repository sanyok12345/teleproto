import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class BotCommandScopeUsers extends TLObject {
    static CONSTRUCTOR_ID = 1011811544;
    static SUBCLASS_OF_ID = 1269783824;
    static className = "BotCommandScopeUsers";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1011811544, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): BotCommandScopeUsers {
        const args: any = {};
        return new BotCommandScopeUsers(args);
    }
}