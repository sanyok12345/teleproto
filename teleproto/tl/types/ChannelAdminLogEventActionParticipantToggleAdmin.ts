import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeChannelParticipant } from "./TypeChannelParticipant";

export class ChannelAdminLogEventActionParticipantToggleAdmin extends TLObject {
    static CONSTRUCTOR_ID = 3580323600;
    static SUBCLASS_OF_ID = 2998503411;
    static className = "ChannelAdminLogEventActionParticipantToggleAdmin";
    static classType = "constructor";

    prevParticipant!: TypeChannelParticipant;
    newParticipant!: TypeChannelParticipant;

    constructor(args: { prevParticipant?: TypeChannelParticipant, newParticipant?: TypeChannelParticipant } = {}) {
        super();
        this.prevParticipant = args.prevParticipant!;
        this.newParticipant = args.newParticipant!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3580323600, false);
        writer.write(this.prevParticipant.getBytes());
        writer.write(this.newParticipant.getBytes());
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): ChannelAdminLogEventActionParticipantToggleAdmin {
        const args: any = {};
        const _prevParticipant = reader.tgReadObject();
        args.prevParticipant = _prevParticipant;
        const _newParticipant = reader.tgReadObject();
        args.newParticipant = _newParticipant;
        return new ChannelAdminLogEventActionParticipantToggleAdmin(args);
    }
}