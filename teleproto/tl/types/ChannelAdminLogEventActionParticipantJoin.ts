import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class ChannelAdminLogEventActionParticipantJoin extends TLObject {
    static CONSTRUCTOR_ID = 405815507;
    static SUBCLASS_OF_ID = 2998503411;
    static className = "ChannelAdminLogEventActionParticipantJoin";
    static classType = "constructor";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(405815507, false);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): ChannelAdminLogEventActionParticipantJoin {
        const args: any = {};
        return new ChannelAdminLogEventActionParticipantJoin(args);
    }
}