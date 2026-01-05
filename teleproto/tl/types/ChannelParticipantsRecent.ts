import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class ChannelParticipantsRecent extends TLObject {
    static CONSTRUCTOR_ID = 3728686201;
    static SUBCLASS_OF_ID = 3209570131;
    static className = "ChannelParticipantsRecent";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3728686201, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): ChannelParticipantsRecent {
        const args: any = {};
        return new ChannelParticipantsRecent(args);
    }
}