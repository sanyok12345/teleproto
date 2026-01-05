import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { TypeMessages } from "../../types/messages/TypeMessages";

export class SearchPosts extends MTProtoRequest {
    static CONSTRUCTOR_ID = 4072993357;
    static SUBCLASS_OF_ID = 3568569182;
    static className = "channels.SearchPosts";
    static classType = "request";

    flags?: number;
    hashtag?: string;
    query?: string;
    offsetRate?: number;
    offsetPeer!: EntityLike;
    offsetId!: number;
    limit!: number;
    allowPaidStars?: bigint;

    constructor(args: { flags?: number, hashtag?: string, query?: string, offsetRate?: number, offsetPeer?: EntityLike, offsetId?: number, limit?: number, allowPaidStars?: bigint } = {}) {
        super();
        this.flags = args.flags;
        this.hashtag = args.hashtag;
        this.query = args.query;
        this.offsetRate = args.offsetRate;
        this.offsetPeer = args.offsetPeer!;
        this.offsetId = args.offsetId!;
        this.limit = args.limit!;
        this.allowPaidStars = args.allowPaidStars;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(4072993357, false);
        let flags = 0;
        if (this.hashtag !== undefined && this.hashtag !== null) { flags |= 1 << 0; }
        if (this.query !== undefined && this.query !== null) { flags |= 1 << 1; }
        if (this.allowPaidStars !== undefined && this.allowPaidStars !== null) { flags |= 1 << 2; }
        writer.writeInt(flags, false);
        if (this.hashtag !== undefined && this.hashtag !== null) {
            writer.tgWriteString(this.hashtag);
        }
        if (this.query !== undefined && this.query !== null) {
            writer.tgWriteString(this.query);
        }
        writer.writeInt(this.offsetRate!);
        writer.write((this.offsetPeer as any).getBytes());
        writer.writeInt(this.offsetId);
        writer.writeInt(this.limit);
        if (this.allowPaidStars !== undefined && this.allowPaidStars !== null) {
            writer.writeLargeInt(this.allowPaidStars, 64);
        }
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeMessages {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): SearchPosts {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _hashtag = reader.tgReadString();
            args.hashtag = _hashtag;
        } else {
            args.hashtag = undefined;
        }
        if (args.flags & (1 << 1)) {
            const _query = reader.tgReadString();
            args.query = _query;
        } else {
            args.query = undefined;
        }
        const _offsetRate = reader.readInt();
        args.offsetRate = _offsetRate;
        const _offsetPeer = reader.tgReadObject();
        args.offsetPeer = _offsetPeer;
        const _offsetId = reader.readInt();
        args.offsetId = _offsetId;
        const _limit = reader.readInt();
        args.limit = _limit;
        if (args.flags & (1 << 2)) {
            const _allowPaidStars = reader.readLargeInt(64);
            args.allowPaidStars = _allowPaidStars;
        } else {
            args.allowPaidStars = undefined;
        }
        return new SearchPosts(args);
    }
}