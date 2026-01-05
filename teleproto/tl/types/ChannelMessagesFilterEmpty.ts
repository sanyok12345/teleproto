import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class ChannelMessagesFilterEmpty extends TLObject {
    static CONSTRUCTOR_ID = 2496933607;
    static SUBCLASS_OF_ID = 322136662;
    static className = "ChannelMessagesFilterEmpty";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2496933607, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): ChannelMessagesFilterEmpty {
        const args: any = {};
        return new ChannelMessagesFilterEmpty(args);
    }
}