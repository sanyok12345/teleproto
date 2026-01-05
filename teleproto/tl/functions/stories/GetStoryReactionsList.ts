import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { TypeReaction } from "../../types/TypeReaction";
import { TypeStoryReactionsList } from "../../types/stories/TypeStoryReactionsList";

export class GetStoryReactionsList extends MTProtoRequest {
    static CONSTRUCTOR_ID = 3115485215;
    static SUBCLASS_OF_ID = 74420707;
    static className = "stories.GetStoryReactionsList";
    static classType = "request";

    flags?: number;
    forwardsFirst?: boolean;
    peer?: EntityLike;
    id?: number;
    reaction?: TypeReaction;
    offset?: string;
    limit!: number;

    constructor(args: { flags?: number, forwardsFirst?: boolean, peer?: EntityLike, id?: number, reaction?: TypeReaction, offset?: string, limit?: number } = {}) {
        super();
        this.flags = args.flags;
        this.forwardsFirst = args.forwardsFirst;
        this.peer = args.peer;
        this.id = args.id;
        this.reaction = args.reaction;
        this.offset = args.offset;
        this.limit = args.limit!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3115485215, false);
        let flags = 0;
        if (this.forwardsFirst) { flags |= 1 << 2; }
        if (this.reaction !== undefined && this.reaction !== null) { flags |= 1 << 0; }
        if (this.offset !== undefined && this.offset !== null) { flags |= 1 << 1; }
        writer.writeInt(flags, false);
        if (this.forwardsFirst !== undefined && this.forwardsFirst !== null) {
        }
        writer.write((this.peer! as any).getBytes());
        writer.writeInt(this.id!);
        if (this.reaction !== undefined && this.reaction !== null) {
            writer.write(this.reaction.getBytes());
        }
        if (this.offset !== undefined && this.offset !== null) {
            writer.tgWriteString(this.offset);
        }
        writer.writeInt(this.limit);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeStoryReactionsList {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetStoryReactionsList {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 2)) {
            const _forwardsFirst = true;
            args.forwardsFirst = _forwardsFirst;
        } else {
            args.forwardsFirst = false;
        }
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        const _id = reader.readInt();
        args.id = _id;
        if (args.flags & (1 << 0)) {
            const _reaction = reader.tgReadObject();
            args.reaction = _reaction;
        } else {
            args.reaction = undefined;
        }
        if (args.flags & (1 << 1)) {
            const _offset = reader.tgReadString();
            args.offset = _offset;
        } else {
            args.offset = undefined;
        }
        const _limit = reader.readInt();
        args.limit = _limit;
        return new GetStoryReactionsList(args);
    }
}