import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeGroupCallParticipant } from "./TypeGroupCallParticipant";

export class ChannelAdminLogEventActionParticipantUnmute extends TLObject {
    static CONSTRUCTOR_ID = 3863226816;
    static SUBCLASS_OF_ID = 2998503411;
    static className = "ChannelAdminLogEventActionParticipantUnmute";
    static classType = "constructor";

    participant!: TypeGroupCallParticipant;

    constructor(args: { participant?: TypeGroupCallParticipant } = {}) {
        super();
        this.participant = args.participant!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3863226816, false);
        writer.write(this.participant.getBytes());
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): ChannelAdminLogEventActionParticipantUnmute {
        const args: any = {};
        const _participant = reader.tgReadObject();
        args.participant = _participant;
        return new ChannelAdminLogEventActionParticipantUnmute(args);
    }
}