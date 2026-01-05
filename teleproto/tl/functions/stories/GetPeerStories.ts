import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { TypePeerStories } from "../../types/stories/TypePeerStories";

export class GetPeerStories extends MTProtoRequest {
    static CONSTRUCTOR_ID = 743103056;
    static SUBCLASS_OF_ID = 2639712208;
    static className = "stories.GetPeerStories";
    static classType = "request";

    peer?: EntityLike;

    constructor(args: { peer?: EntityLike } = {}) {
        super();
        this.peer = args.peer;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(743103056, false);
        writer.write((this.peer! as any).getBytes());
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypePeerStories {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetPeerStories {
        const args: any = {};
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        return new GetPeerStories(args);
    }
}