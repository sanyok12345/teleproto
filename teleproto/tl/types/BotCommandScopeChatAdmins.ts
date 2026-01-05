import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class BotCommandScopeChatAdmins extends TLObject {
    static CONSTRUCTOR_ID = 3114950762;
    static SUBCLASS_OF_ID = 1269783824;
    static className = "BotCommandScopeChatAdmins";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3114950762, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): BotCommandScopeChatAdmins {
        const args: any = {};
        return new BotCommandScopeChatAdmins(args);
    }
}