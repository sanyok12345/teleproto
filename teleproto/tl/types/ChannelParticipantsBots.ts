import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class ChannelParticipantsBots extends TLObject {
    static CONSTRUCTOR_ID = 2966521435;
    static SUBCLASS_OF_ID = 3209570131;
    static className = "ChannelParticipantsBots";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2966521435, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): ChannelParticipantsBots {
        const args: any = {};
        return new ChannelParticipantsBots(args);
    }
}