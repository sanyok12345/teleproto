import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";

export class ChannelParticipantsNotModified extends TLObject {
    static CONSTRUCTOR_ID = 4028055529;
    static SUBCLASS_OF_ID = 3859443300;
    static className = "channels.ChannelParticipantsNotModified";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(4028055529, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): ChannelParticipantsNotModified {
        const args: any = {};
        return new ChannelParticipantsNotModified(args);
    }
}