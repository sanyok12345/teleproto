import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { TypeChannelParticipant } from "../../types/channels/TypeChannelParticipant";

export class GetParticipant extends MTProtoRequest {
    static CONSTRUCTOR_ID = 2695589062;
    static SUBCLASS_OF_ID = 1717048602;
    static className = "channels.GetParticipant";
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
        writer.writeInt(2695589062, false);
        writer.write((this.channel! as any).getBytes());
        writer.write((this.participant as any).getBytes());
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeChannelParticipant {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetParticipant {
        const args: any = {};
        const _channel = reader.tgReadObject();
        args.channel = _channel;
        const _participant = reader.tgReadObject();
        args.participant = _participant;
        return new GetParticipant(args);
    }
}