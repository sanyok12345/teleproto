import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { TypeForumTopics } from "../../types/messages/TypeForumTopics";

export class GetForumTopics extends MTProtoRequest {
    static CONSTRUCTOR_ID = 1000635391;
    static SUBCLASS_OF_ID = 2384281118;
    static className = "messages.GetForumTopics";
    static classType = "request";

    flags?: number;
    peer?: EntityLike;
    q?: string;
    offsetDate!: number;
    offsetId!: number;
    offsetTopic!: number;
    limit!: number;

    constructor(args: { flags?: number, peer?: EntityLike, q?: string, offsetDate?: number, offsetId?: number, offsetTopic?: number, limit?: number } = {}) {
        super();
        this.flags = args.flags;
        this.peer = args.peer;
        this.q = args.q;
        this.offsetDate = args.offsetDate!;
        this.offsetId = args.offsetId!;
        this.offsetTopic = args.offsetTopic!;
        this.limit = args.limit!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1000635391, false);
        let flags = 0;
        if (this.q !== undefined && this.q !== null) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        writer.write((this.peer! as any).getBytes());
        if (this.q !== undefined && this.q !== null) {
            writer.tgWriteString(this.q);
        }
        writer.writeInt(this.offsetDate);
        writer.writeInt(this.offsetId);
        writer.writeInt(this.offsetTopic);
        writer.writeInt(this.limit);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeForumTopics {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetForumTopics {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        if (args.flags & (1 << 0)) {
            const _q = reader.tgReadString();
            args.q = _q;
        } else {
            args.q = undefined;
        }
        const _offsetDate = reader.readInt();
        args.offsetDate = _offsetDate;
        const _offsetId = reader.readInt();
        args.offsetId = _offsetId;
        const _offsetTopic = reader.readInt();
        args.offsetTopic = _offsetTopic;
        const _limit = reader.readInt();
        args.limit = _limit;
        return new GetForumTopics(args);
    }
}