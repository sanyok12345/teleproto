import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { TypeStories } from "../../types/stories/TypeStories";

export class GetStoriesArchive extends MTProtoRequest {
    static CONSTRUCTOR_ID = 3023380502;
    static SUBCLASS_OF_ID = 622595116;
    static className = "stories.GetStoriesArchive";
    static classType = "request";

    peer?: EntityLike;
    offsetId!: number;
    limit!: number;

    constructor(args: { peer?: EntityLike, offsetId?: number, limit?: number } = {}) {
        super();
        this.peer = args.peer;
        this.offsetId = args.offsetId!;
        this.limit = args.limit!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3023380502, false);
        writer.write((this.peer! as any).getBytes());
        writer.writeInt(this.offsetId);
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

    static fromReader(reader: BinaryReader): GetStoriesArchive {
        const args: any = {};
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        const _offsetId = reader.readInt();
        args.offsetId = _offsetId;
        const _limit = reader.readInt();
        args.limit = _limit;
        return new GetStoriesArchive(args);
    }
}