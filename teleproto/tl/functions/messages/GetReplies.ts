import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { MessageIDLike } from "../../types/../../define";
import { TypeMessages } from "../../types/messages/TypeMessages";

export class GetReplies extends MTProtoRequest {
    static CONSTRUCTOR_ID = 584962828;
    static SUBCLASS_OF_ID = 3568569182;
    static className = "messages.GetReplies";
    static classType = "request";

    peer?: EntityLike;
    msgId?: MessageIDLike;
    offsetId!: number;
    offsetDate!: number;
    addOffset!: number;
    limit!: number;
    maxId?: number;
    minId?: number;
    hash?: bigint;

    constructor(args: { peer?: EntityLike, msgId?: MessageIDLike, offsetId?: number, offsetDate?: number, addOffset?: number, limit?: number, maxId?: number, minId?: number, hash?: bigint } = {}) {
        super();
        this.peer = args.peer;
        this.msgId = args.msgId;
        this.offsetId = args.offsetId!;
        this.offsetDate = args.offsetDate!;
        this.addOffset = args.addOffset!;
        this.limit = args.limit!;
        this.maxId = args.maxId;
        this.minId = args.minId;
        this.hash = args.hash;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(584962828, false);
        writer.write((this.peer! as any).getBytes());
        if (typeof this.msgId! === 'number') {
            writer.writeInt(this.msgId!);
        } else {
            writer.writeInt((this.msgId! as any).id);
        }
        writer.writeInt(this.offsetId);
        writer.writeInt(this.offsetDate);
        writer.writeInt(this.addOffset);
        writer.writeInt(this.limit);
        writer.writeInt(this.maxId!);
        writer.writeInt(this.minId!);
        writer.writeLargeInt(this.hash!, 64);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeMessages {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetReplies {
        const args: any = {};
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        const _msgId = reader.tgReadObject();
        args.msgId = _msgId;
        const _offsetId = reader.readInt();
        args.offsetId = _offsetId;
        const _offsetDate = reader.readInt();
        args.offsetDate = _offsetDate;
        const _addOffset = reader.readInt();
        args.addOffset = _addOffset;
        const _limit = reader.readInt();
        args.limit = _limit;
        const _maxId = reader.readInt();
        args.maxId = _maxId;
        const _minId = reader.readInt();
        args.minId = _minId;
        const _hash = reader.readLargeInt(64);
        args.hash = _hash;
        return new GetReplies(args);
    }
}