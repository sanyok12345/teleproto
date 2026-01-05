import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { TypeMessages } from "../../types/messages/TypeMessages";

export class GetSavedHistory extends MTProtoRequest {
    static CONSTRUCTOR_ID = 2576003081;
    static SUBCLASS_OF_ID = 3568569182;
    static className = "messages.GetSavedHistory";
    static classType = "request";

    flags?: number;
    parentPeer?: EntityLike;
    peer?: EntityLike;
    offsetId!: number;
    offsetDate!: number;
    addOffset!: number;
    limit!: number;
    maxId?: number;
    minId?: number;
    hash?: bigint;

    constructor(args: { flags?: number, parentPeer?: EntityLike, peer?: EntityLike, offsetId?: number, offsetDate?: number, addOffset?: number, limit?: number, maxId?: number, minId?: number, hash?: bigint } = {}) {
        super();
        this.flags = args.flags;
        this.parentPeer = args.parentPeer;
        this.peer = args.peer;
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
        writer.writeInt(2576003081, false);
        let flags = 0;
        if (this.parentPeer !== undefined && this.parentPeer !== null) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        if (this.parentPeer !== undefined && this.parentPeer !== null) {
            writer.write((this.parentPeer as any).getBytes());
        }
        writer.write((this.peer! as any).getBytes());
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

    static fromReader(reader: BinaryReader): GetSavedHistory {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _parentPeer = reader.tgReadObject();
            args.parentPeer = _parentPeer;
        } else {
            args.parentPeer = undefined;
        }
        const _peer = reader.tgReadObject();
        args.peer = _peer;
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
        return new GetSavedHistory(args);
    }
}