import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { TypeAffectedHistory } from "../../types/messages/TypeAffectedHistory";

export class DeleteParticipantHistory extends MTProtoRequest {
    static CONSTRUCTOR_ID = 913655003;
    static SUBCLASS_OF_ID = 743031062;
    static className = "channels.DeleteParticipantHistory";
    static classType = "request";

    channel?: EntityLike;
    participant!: EntityLike;

    constructor(args: { channel?: EntityLike, participant?: EntityLike } = {}) {
        super();
        this.channel = args.channel;
        this.participant = args.participant!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(913655003, false);
        writer.write((this.channel! as any).getBytes());
        writer.write((this.participant as any).getBytes());
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeAffectedHistory {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): DeleteParticipantHistory {
        const args: any = {};
        const _channel = reader.tgReadObject();
        args.channel = _channel;
        const _participant = reader.tgReadObject();
        args.participant = _participant;
        return new DeleteParticipantHistory(args);
    }
}