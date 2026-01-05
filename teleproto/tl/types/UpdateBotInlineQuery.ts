import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeGeoPoint } from "./TypeGeoPoint";
import { TypeInlineQueryPeerType } from "./TypeInlineQueryPeerType";

export class UpdateBotInlineQuery extends TLObject {
    static CONSTRUCTOR_ID = 1232025500;
    static SUBCLASS_OF_ID = 2676568142;
    static className = "UpdateBotInlineQuery";
    static classType = "constructor";

    flags!: number;
    queryId!: bigint;
    userId!: bigint;
    query!: string;
    geo?: TypeGeoPoint;
    peerType?: TypeInlineQueryPeerType;
    offset!: string;

    constructor(args: { flags?: number, queryId?: bigint, userId?: bigint, query?: string, geo?: TypeGeoPoint, peerType?: TypeInlineQueryPeerType, offset?: string } = {}) {
        super();
        this.flags = args.flags!;
        this.queryId = args.queryId!;
        this.userId = args.userId!;
        this.query = args.query!;
        this.geo = args.geo;
        this.peerType = args.peerType;
        this.offset = args.offset!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1232025500, false);
        let flags = 0;
        if (this.geo !== undefined && this.geo !== null) { flags |= 1 << 0; }
        if (this.peerType !== undefined && this.peerType !== null) { flags |= 1 << 1; }
        writer.writeInt(flags, false);
        writer.writeLargeInt(this.queryId, 64);
        writer.writeLargeInt(this.userId, 64);
        writer.tgWriteString(this.query);
        if (this.geo !== undefined && this.geo !== null) {
            writer.write(this.geo.getBytes());
        }
        if (this.peerType !== undefined && this.peerType !== null) {
            writer.write(this.peerType.getBytes());
        }
        writer.tgWriteString(this.offset);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): UpdateBotInlineQuery {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        const _queryId = reader.readLargeInt(64);
        args.queryId = _queryId;
        const _userId = reader.readLargeInt(64);
        args.userId = _userId;
        const _query = reader.tgReadString();
        args.query = _query;
        if (args.flags & (1 << 0)) {
            const _geo = reader.tgReadObject();
            args.geo = _geo;
        } else {
            args.geo = undefined;
        }
        if (args.flags & (1 << 1)) {
            const _peerType = reader.tgReadObject();
            args.peerType = _peerType;
        } else {
            args.peerType = undefined;
        }
        const _offset = reader.tgReadString();
        args.offset = _offset;
        return new UpdateBotInlineQuery(args);
    }
}