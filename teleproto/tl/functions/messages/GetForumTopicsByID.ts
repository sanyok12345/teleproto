import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { TypeForumTopics } from "../../types/messages/TypeForumTopics";

export class GetForumTopicsByID extends MTProtoRequest {
    static CONSTRUCTOR_ID = 2936687112;
    static SUBCLASS_OF_ID = 2384281118;
    static className = "messages.GetForumTopicsByID";
    static classType = "request";

    peer?: EntityLike;
    topics!: number[];

    constructor(args: { peer?: EntityLike, topics?: number[] } = {}) {
        super();
        this.peer = args.peer;
        this.topics = args.topics!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2936687112, false);
        writer.write((this.peer! as any).getBytes());
        writer.writeVector(this.topics, (item) => {
            writer.writeInt(item);
        });
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeForumTopics {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetForumTopicsByID {
        const args: any = {};
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        const _topics = reader.readVector((reader) => {
            const item = reader.readInt();
            return item;
        });
        args.topics = _topics;
        return new GetForumTopicsByID(args);
    }
}