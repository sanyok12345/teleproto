import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { TypeChannelAdminLogEventsFilter } from "../../types/TypeChannelAdminLogEventsFilter";
import { TypeAdminLogResults } from "../../types/channels/TypeAdminLogResults";

export class GetAdminLog extends MTProtoRequest {
    static CONSTRUCTOR_ID = 870184064;
    static SUBCLASS_OF_ID = 1374713532;
    static className = "channels.GetAdminLog";
    static classType = "request";

    flags?: number;
    channel?: EntityLike;
    q!: string;
    eventsFilter?: TypeChannelAdminLogEventsFilter;
    admins?: EntityLike[];
    maxId?: bigint;
    minId?: bigint;
    limit!: number;

    constructor(args: { flags?: number, channel?: EntityLike, q?: string, eventsFilter?: TypeChannelAdminLogEventsFilter, admins?: EntityLike[], maxId?: bigint, minId?: bigint, limit?: number } = {}) {
        super();
        this.flags = args.flags;
        this.channel = args.channel;
        this.q = args.q!;
        this.eventsFilter = args.eventsFilter;
        this.admins = args.admins;
        this.maxId = args.maxId;
        this.minId = args.minId;
        this.limit = args.limit!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(870184064, false);
        let flags = 0;
        if (this.eventsFilter !== undefined && this.eventsFilter !== null) { flags |= 1 << 0; }
        if (this.admins !== undefined && this.admins !== null) { flags |= 1 << 1; }
        writer.writeInt(flags, false);
        writer.write((this.channel! as any).getBytes());
        writer.tgWriteString(this.q);
        if (this.eventsFilter !== undefined && this.eventsFilter !== null) {
            writer.write(this.eventsFilter.getBytes());
        }
        if (this.admins !== undefined && this.admins !== null) {
            writer.writeVector(this.admins, (item) => {
                writer.write((item as any).getBytes());
            });
        }
        writer.writeLargeInt(this.maxId!, 64);
        writer.writeLargeInt(this.minId!, 64);
        writer.writeInt(this.limit);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeAdminLogResults {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetAdminLog {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        const _channel = reader.tgReadObject();
        args.channel = _channel;
        const _q = reader.tgReadString();
        args.q = _q;
        if (args.flags & (1 << 0)) {
            const _eventsFilter = reader.tgReadObject();
            args.eventsFilter = _eventsFilter;
        } else {
            args.eventsFilter = undefined;
        }
        if (args.flags & (1 << 1)) {
            const _admins = reader.readVector((reader) => {
                const item = reader.tgReadObject();
                return item;
            });
            args.admins = _admins;
        } else {
            args.admins = undefined;
        }
        const _maxId = reader.readLargeInt(64);
        args.maxId = _maxId;
        const _minId = reader.readLargeInt(64);
        args.minId = _minId;
        const _limit = reader.readInt();
        args.limit = _limit;
        return new GetAdminLog(args);
    }
}