import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeMediaArea } from "../../types/TypeMediaArea";
import { EntityLike } from "../../types/../../define";
import { TypeFoundStories } from "../../types/stories/TypeFoundStories";

export class SearchPosts extends MTProtoRequest {
    static CONSTRUCTOR_ID = 3514894599;
    static SUBCLASS_OF_ID = 393808693;
    static className = "stories.SearchPosts";
    static classType = "request";

    flags?: number;
    hashtag?: string;
    area?: TypeMediaArea;
    peer?: EntityLike;
    offset!: string;
    limit!: number;

    constructor(args: { flags?: number, hashtag?: string, area?: TypeMediaArea, peer?: EntityLike, offset?: string, limit?: number } = {}) {
        super();
        this.flags = args.flags;
        this.hashtag = args.hashtag;
        this.area = args.area;
        this.peer = args.peer;
        this.offset = args.offset!;
        this.limit = args.limit!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3514894599, false);
        let flags = 0;
        if (this.hashtag !== undefined && this.hashtag !== null) { flags |= 1 << 0; }
        if (this.area !== undefined && this.area !== null) { flags |= 1 << 1; }
        if (this.peer !== undefined && this.peer !== null) { flags |= 1 << 2; }
        writer.writeInt(flags, false);
        if (this.hashtag !== undefined && this.hashtag !== null) {
            writer.tgWriteString(this.hashtag);
        }
        if (this.area !== undefined && this.area !== null) {
            writer.write(this.area.getBytes());
        }
        if (this.peer !== undefined && this.peer !== null) {
            writer.write((this.peer as any).getBytes());
        }
        writer.tgWriteString(this.offset);
        writer.writeInt(this.limit);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeFoundStories {
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
            const _area = reader.tgReadObject();
            args.area = _area;
        } else {
            args.area = undefined;
        }
        if (args.flags & (1 << 2)) {
            const _peer = reader.tgReadObject();
            args.peer = _peer;
        } else {
            args.peer = undefined;
        }
        const _offset = reader.tgReadString();
        args.offset = _offset;
        const _limit = reader.readInt();
        args.limit = _limit;
        return new SearchPosts(args);
    }
}