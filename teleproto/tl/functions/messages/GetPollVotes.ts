import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { TypeVotesList } from "../../types/messages/TypeVotesList";

export class GetPollVotes extends MTProtoRequest {
    static CONSTRUCTOR_ID = 3094231054;
    static SUBCLASS_OF_ID = 3256457349;
    static className = "messages.GetPollVotes";
    static classType = "request";

    flags?: number;
    peer?: EntityLike;
    id?: number;
    option?: Buffer;
    offset?: string;
    limit!: number;

    constructor(args: { flags?: number, peer?: EntityLike, id?: number, option?: Buffer, offset?: string, limit?: number } = {}) {
        super();
        this.flags = args.flags;
        this.peer = args.peer;
        this.id = args.id;
        this.option = args.option;
        this.offset = args.offset;
        this.limit = args.limit!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3094231054, false);
        let flags = 0;
        if (this.option !== undefined && this.option !== null) { flags |= 1 << 0; }
        if (this.offset !== undefined && this.offset !== null) { flags |= 1 << 1; }
        writer.writeInt(flags, false);
        writer.write((this.peer! as any).getBytes());
        writer.writeInt(this.id!);
        if (this.option !== undefined && this.option !== null) {
            writer.tgWriteBytes(this.option);
        }
        if (this.offset !== undefined && this.offset !== null) {
            writer.tgWriteString(this.offset);
        }
        writer.writeInt(this.limit);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeVotesList {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetPollVotes {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        const _id = reader.readInt();
        args.id = _id;
        if (args.flags & (1 << 0)) {
            const _option = reader.tgReadBytes();
            args.option = _option;
        } else {
            args.option = undefined;
        }
        if (args.flags & (1 << 1)) {
            const _offset = reader.tgReadString();
            args.offset = _offset;
        } else {
            args.offset = undefined;
        }
        const _limit = reader.readInt();
        args.limit = _limit;
        return new GetPollVotes(args);
    }
}