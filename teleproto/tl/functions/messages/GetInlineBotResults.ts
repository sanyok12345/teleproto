import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { TypeInputGeoPoint } from "../../types/TypeInputGeoPoint";
import { TypeBotResults } from "../../types/messages/TypeBotResults";

export class GetInlineBotResults extends MTProtoRequest {
    static CONSTRUCTOR_ID = 1364105629;
    static SUBCLASS_OF_ID = 1054136777;
    static className = "messages.GetInlineBotResults";
    static classType = "request";

    flags?: number;
    bot?: EntityLike;
    peer?: EntityLike;
    geoPoint?: TypeInputGeoPoint;
    query?: string;
    offset!: string;

    constructor(args: { flags?: number, bot?: EntityLike, peer?: EntityLike, geoPoint?: TypeInputGeoPoint, query?: string, offset?: string } = {}) {
        super();
        this.flags = args.flags;
        this.bot = args.bot;
        this.peer = args.peer;
        this.geoPoint = args.geoPoint;
        this.query = args.query;
        this.offset = args.offset!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1364105629, false);
        let flags = 0;
        if (this.geoPoint !== undefined && this.geoPoint !== null) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        writer.write((this.bot! as any).getBytes());
        writer.write((this.peer! as any).getBytes());
        if (this.geoPoint !== undefined && this.geoPoint !== null) {
            writer.write(this.geoPoint.getBytes());
        }
        writer.tgWriteString(this.query!);
        writer.tgWriteString(this.offset);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeBotResults {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetInlineBotResults {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        const _bot = reader.tgReadObject();
        args.bot = _bot;
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        if (args.flags & (1 << 0)) {
            const _geoPoint = reader.tgReadObject();
            args.geoPoint = _geoPoint;
        } else {
            args.geoPoint = undefined;
        }
        const _query = reader.tgReadString();
        args.query = _query;
        const _offset = reader.tgReadString();
        args.offset = _offset;
        return new GetInlineBotResults(args);
    }
}