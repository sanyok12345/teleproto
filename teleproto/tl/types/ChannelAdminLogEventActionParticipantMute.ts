import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeGroupCallParticipant } from "./TypeGroupCallParticipant";

export class ChannelAdminLogEventActionParticipantMute extends TLObject {
    static CONSTRUCTOR_ID = 4179895506;
    static SUBCLASS_OF_ID = 2998503411;
    static className = "ChannelAdminLogEventActionParticipantMute";
    static classType = "constructor";

    participant!: TypeGroupCallParticipant;

    constructor(args: { participant?: TypeGroupCallParticipant } = {}) {
        super();
        this.participant = args.participant!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(4179895506, false);
        writer.write(this.participant.getBytes());
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): ChannelAdminLogEventActionParticipantMute {
        const args: any = {};
        const _participant = reader.tgReadObject();
        args.participant = _participant;
        return new ChannelAdminLogEventActionParticipantMute(args);
    }
}