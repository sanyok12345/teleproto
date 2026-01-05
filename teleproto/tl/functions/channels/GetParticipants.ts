import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { TypeChannelParticipantsFilter } from "../../types/TypeChannelParticipantsFilter";
import { TypeChannelParticipants } from "../../types/channels/TypeChannelParticipants";

export class GetParticipants extends MTProtoRequest {
    static CONSTRUCTOR_ID = 2010044880;
    static SUBCLASS_OF_ID = 3859443300;
    static className = "channels.GetParticipants";
    static classType = "request";

    channel?: EntityLike;
    filter!: TypeChannelParticipantsFilter;
    offset!: number;
    limit!: number;
    hash?: bigint;

    constructor(args: { channel?: EntityLike, filter?: TypeChannelParticipantsFilter, offset?: number, limit?: number, hash?: bigint } = {}) {
        super();
        this.channel = args.channel;
        this.filter = args.filter!;
        this.offset = args.offset!;
        this.limit = args.limit!;
        this.hash = args.hash;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2010044880, false);
        writer.write((this.channel! as any).getBytes());
        writer.write(this.filter.getBytes());
        writer.writeInt(this.offset);
        writer.writeInt(this.limit);
        writer.writeLargeInt(this.hash!, 64);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeChannelParticipants {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetParticipants {
        const args: any = {};
        const _channel = reader.tgReadObject();
        args.channel = _channel;
        const _filter = reader.tgReadObject();
        args.filter = _filter;
        const _offset = reader.readInt();
        args.offset = _offset;
        const _limit = reader.readInt();
        args.limit = _limit;
        const _hash = reader.readLargeInt(64);
        args.hash = _hash;
        return new GetParticipants(args);
    }
}