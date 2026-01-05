import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeGroupCallParticipant } from "./TypeGroupCallParticipant";

export class ChannelAdminLogEventActionParticipantVolume extends TLObject {
    static CONSTRUCTOR_ID = 1048537159;
    static SUBCLASS_OF_ID = 2998503411;
    static className = "ChannelAdminLogEventActionParticipantVolume";
    static classType = "constructor";

    participant!: TypeGroupCallParticipant;

    constructor(args: { participant?: TypeGroupCallParticipant } = {}) {
        super();
        this.participant = args.participant!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1048537159, false);
        writer.write(this.participant.getBytes());
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): ChannelAdminLogEventActionParticipantVolume {
        const args: any = {};
        const _participant = reader.tgReadObject();
        args.participant = _participant;
        return new ChannelAdminLogEventActionParticipantVolume(args);
    }
}