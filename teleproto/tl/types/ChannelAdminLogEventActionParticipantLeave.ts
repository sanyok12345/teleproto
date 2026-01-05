import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class ChannelAdminLogEventActionParticipantLeave extends TLObject {
    static CONSTRUCTOR_ID = 4170676210;
    static SUBCLASS_OF_ID = 2998503411;
    static className = "ChannelAdminLogEventActionParticipantLeave";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(4170676210, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): ChannelAdminLogEventActionParticipantLeave {
        const args: any = {};
        return new ChannelAdminLogEventActionParticipantLeave(args);
    }
}