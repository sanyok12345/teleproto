import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { TypeMessages } from "../../types/messages/TypeMessages";

export class GetUnreadMentions extends MTProtoRequest {
    static CONSTRUCTOR_ID = 4043827088;
    static SUBCLASS_OF_ID = 3568569182;
    static className = "messages.GetUnreadMentions";
    static classType = "request";

    flags?: number;
    peer?: EntityLike;
    topMsgId?: number;
    offsetId!: number;
    addOffset!: number;
    limit!: number;
    maxId?: number;
    minId?: number;

    constructor(args: { flags?: number, peer?: EntityLike, topMsgId?: number, offsetId?: number, addOffset?: number, limit?: number, maxId?: number, minId?: number } = {}) {
        super();
        this.flags = args.flags;
        this.peer = args.peer;
        this.topMsgId = args.topMsgId;
        this.offsetId = args.offsetId!;
        this.addOffset = args.addOffset!;
        this.limit = args.limit!;
        this.maxId = args.maxId;
        this.minId = args.minId;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(4043827088, false);
        let flags = 0;
        if (this.topMsgId !== undefined && this.topMsgId !== null) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        writer.write((this.peer! as any).getBytes());
        if (this.topMsgId !== undefined && this.topMsgId !== null) {
            writer.writeInt(this.topMsgId);
        }
        writer.writeInt(this.offsetId);
        writer.writeInt(this.addOffset);
        writer.writeInt(this.limit);
        writer.writeInt(this.maxId!);
        writer.writeInt(this.minId!);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeMessages {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetUnreadMentions {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        if (args.flags & (1 << 0)) {
            const _topMsgId = reader.readInt();
            args.topMsgId = _topMsgId;
        } else {
            args.topMsgId = undefined;
        }
        const _offsetId = reader.readInt();
        args.offsetId = _offsetId;
        const _addOffset = reader.readInt();
        args.addOffset = _addOffset;
        const _limit = reader.readInt();
        args.limit = _limit;
        const _maxId = reader.readInt();
        args.maxId = _maxId;
        const _minId = reader.readInt();
        args.minId = _minId;
        return new GetUnreadMentions(args);
    }
}