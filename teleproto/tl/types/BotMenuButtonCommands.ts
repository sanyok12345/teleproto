import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class BotMenuButtonCommands extends TLObject {
    static CONSTRUCTOR_ID = 1113113093;
    static SUBCLASS_OF_ID = 1282522428;
    static className = "BotMenuButtonCommands";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1113113093, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): BotMenuButtonCommands {
        const args: any = {};
        return new BotMenuButtonCommands(args);
    }
}