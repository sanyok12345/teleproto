import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class BotMenuButtonDefault extends TLObject {
    static CONSTRUCTOR_ID = 1966318984;
    static SUBCLASS_OF_ID = 1282522428;
    static className = "BotMenuButtonDefault";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1966318984, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): BotMenuButtonDefault {
        const args: any = {};
        return new BotMenuButtonDefault(args);
    }
}