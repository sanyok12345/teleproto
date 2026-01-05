import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { TypeChannelMessagesFilter } from "../../types/TypeChannelMessagesFilter";
import { TypeChannelDifference } from "../../types/updates/TypeChannelDifference";

export class GetChannelDifference extends MTProtoRequest {
    static CONSTRUCTOR_ID = 51854712;
    static SUBCLASS_OF_ID = 696872797;
    static className = "updates.GetChannelDifference";
    static classType = "request";

    flags?: number;
    force?: boolean;
    channel?: EntityLike;
    filter!: TypeChannelMessagesFilter;
    pts!: number;
    limit!: number;

    constructor(args: { flags?: number, force?: boolean, channel?: EntityLike, filter?: TypeChannelMessagesFilter, pts?: number, limit?: number } = {}) {
        super();
        this.flags = args.flags;
        this.force = args.force;
        this.channel = args.channel;
        this.filter = args.filter!;
        this.pts = args.pts!;
        this.limit = args.limit!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(51854712, false);
        let flags = 0;
        if (this.force) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        if (this.force !== undefined && this.force !== null) {
        }
        writer.write((this.channel! as any).getBytes());
        writer.write(this.filter.getBytes());
        writer.writeInt(this.pts);
        writer.writeInt(this.limit);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeChannelDifference {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetChannelDifference {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _force = true;
            args.force = _force;
        } else {
            args.force = false;
        }
        const _channel = reader.tgReadObject();
        args.channel = _channel;
        const _filter = reader.tgReadObject();
        args.filter = _filter;
        const _pts = reader.readInt();
        args.pts = _pts;
        const _limit = reader.readInt();
        args.limit = _limit;
        return new GetChannelDifference(args);
    }
}