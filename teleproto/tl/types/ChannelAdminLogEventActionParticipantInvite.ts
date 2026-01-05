import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeChannelParticipant } from "./TypeChannelParticipant";

export class ChannelAdminLogEventActionParticipantInvite extends TLObject {
    static CONSTRUCTOR_ID = 3810276568;
    static SUBCLASS_OF_ID = 2998503411;
    static className = "ChannelAdminLogEventActionParticipantInvite";
    static classType = "constructor";

    participant!: TypeChannelParticipant;

    constructor(args: { participant?: TypeChannelParticipant } = {}) {
        super();
        this.participant = args.participant!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3810276568, false);
        writer.write(this.participant.getBytes());
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): ChannelAdminLogEventActionParticipantInvite {
        const args: any = {};
        const _participant = reader.tgReadObject();
        args.participant = _participant;
        return new ChannelAdminLogEventActionParticipantInvite(args);
    }
}