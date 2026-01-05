import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { TypeStories } from "../../types/stories/TypeStories";

export class GetAlbumStories extends MTProtoRequest {
    static CONSTRUCTOR_ID = 2894097761;
    static SUBCLASS_OF_ID = 622595116;
    static className = "stories.GetAlbumStories";
    static classType = "request";

    peer?: EntityLike;
    albumId!: number;
    offset!: number;
    limit!: number;

    constructor(args: { peer?: EntityLike, albumId?: number, offset?: number, limit?: number } = {}) {
        super();
        this.peer = args.peer;
        this.albumId = args.albumId!;
        this.offset = args.offset!;
        this.limit = args.limit!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2894097761, false);
        writer.write((this.peer! as any).getBytes());
        writer.writeInt(this.albumId);
        writer.writeInt(this.offset);
        writer.writeInt(this.limit);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeStories {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetAlbumStories {
        const args: any = {};
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        const _albumId = reader.readInt();
        args.albumId = _albumId;
        const _offset = reader.readInt();
        args.offset = _offset;
        const _limit = reader.readInt();
        args.limit = _limit;
        return new GetAlbumStories(args);
    }
}