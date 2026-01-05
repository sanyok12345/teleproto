import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { TypeStoryViewsList } from "../../types/stories/TypeStoryViewsList";

export class GetStoryViewsList extends MTProtoRequest {
    static CONSTRUCTOR_ID = 2127707223;
    static SUBCLASS_OF_ID = 3108205920;
    static className = "stories.GetStoryViewsList";
    static classType = "request";

    flags?: number;
    justContacts?: boolean;
    reactionsFirst?: boolean;
    forwardsFirst?: boolean;
    peer?: EntityLike;
    q?: string;
    id?: number;
    offset!: string;
    limit!: number;

    constructor(args: { flags?: number, justContacts?: boolean, reactionsFirst?: boolean, forwardsFirst?: boolean, peer?: EntityLike, q?: string, id?: number, offset?: string, limit?: number } = {}) {
        super();
        this.flags = args.flags;
        this.justContacts = args.justContacts;
        this.reactionsFirst = args.reactionsFirst;
        this.forwardsFirst = args.forwardsFirst;
        this.peer = args.peer;
        this.q = args.q;
        this.id = args.id;
        this.offset = args.offset!;
        this.limit = args.limit!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2127707223, false);
        let flags = 0;
        if (this.justContacts) { flags |= 1 << 0; }
        if (this.reactionsFirst) { flags |= 1 << 2; }
        if (this.forwardsFirst) { flags |= 1 << 3; }
        if (this.q !== undefined && this.q !== null) { flags |= 1 << 1; }
        writer.writeInt(flags, false);
        if (this.justContacts !== undefined && this.justContacts !== null) {
        }
        if (this.reactionsFirst !== undefined && this.reactionsFirst !== null) {
        }
        if (this.forwardsFirst !== undefined && this.forwardsFirst !== null) {
        }
        writer.write((this.peer! as any).getBytes());
        if (this.q !== undefined && this.q !== null) {
            writer.tgWriteString(this.q);
        }
        writer.writeInt(this.id!);
        writer.tgWriteString(this.offset);
        writer.writeInt(this.limit);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeStoryViewsList {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetStoryViewsList {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _justContacts = true;
            args.justContacts = _justContacts;
        } else {
            args.justContacts = false;
        }
        if (args.flags & (1 << 2)) {
            const _reactionsFirst = true;
            args.reactionsFirst = _reactionsFirst;
        } else {
            args.reactionsFirst = false;
        }
        if (args.flags & (1 << 3)) {
            const _forwardsFirst = true;
            args.forwardsFirst = _forwardsFirst;
        } else {
            args.forwardsFirst = false;
        }
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        if (args.flags & (1 << 1)) {
            const _q = reader.tgReadString();
            args.q = _q;
        } else {
            args.q = undefined;
        }
        const _id = reader.readInt();
        args.id = _id;
        const _offset = reader.tgReadString();
        args.offset = _offset;
        const _limit = reader.readInt();
        args.limit = _limit;
        return new GetStoryViewsList(args);
    }
}