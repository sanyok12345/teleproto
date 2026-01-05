import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { TypeReaction } from "../../types/TypeReaction";
import { TypeMessagesFilter } from "../../types/TypeMessagesFilter";
import { TypeMessages } from "../../types/messages/TypeMessages";

export class Search extends MTProtoRequest {
    static CONSTRUCTOR_ID = 703497338;
    static SUBCLASS_OF_ID = 3568569182;
    static className = "messages.Search";
    static classType = "request";

    flags?: number;
    peer?: EntityLike;
    q!: string;
    fromId?: EntityLike;
    savedPeerId?: EntityLike;
    savedReaction?: TypeReaction[];
    topMsgId?: number;
    filter!: TypeMessagesFilter;
    minDate?: number;
    maxDate!: number;
    offsetId!: number;
    addOffset!: number;
    limit!: number;
    maxId?: number;
    minId?: number;
    hash?: bigint;

    constructor(args: { flags?: number, peer?: EntityLike, q?: string, fromId?: EntityLike, savedPeerId?: EntityLike, savedReaction?: TypeReaction[], topMsgId?: number, filter?: TypeMessagesFilter, minDate?: number, maxDate?: number, offsetId?: number, addOffset?: number, limit?: number, maxId?: number, minId?: number, hash?: bigint } = {}) {
        super();
        this.flags = args.flags;
        this.peer = args.peer;
        this.q = args.q!;
        this.fromId = args.fromId;
        this.savedPeerId = args.savedPeerId;
        this.savedReaction = args.savedReaction;
        this.topMsgId = args.topMsgId;
        this.filter = args.filter!;
        this.minDate = args.minDate;
        this.maxDate = args.maxDate!;
        this.offsetId = args.offsetId!;
        this.addOffset = args.addOffset!;
        this.limit = args.limit!;
        this.maxId = args.maxId;
        this.minId = args.minId;
        this.hash = args.hash;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(703497338, false);
        let flags = 0;
        if (this.fromId !== undefined && this.fromId !== null) { flags |= 1 << 0; }
        if (this.savedPeerId !== undefined && this.savedPeerId !== null) { flags |= 1 << 2; }
        if (this.savedReaction !== undefined && this.savedReaction !== null) { flags |= 1 << 3; }
        if (this.topMsgId !== undefined && this.topMsgId !== null) { flags |= 1 << 1; }
        writer.writeInt(flags, false);
        writer.write((this.peer! as any).getBytes());
        writer.tgWriteString(this.q);
        if (this.fromId !== undefined && this.fromId !== null) {
            writer.write((this.fromId as any).getBytes());
        }
        if (this.savedPeerId !== undefined && this.savedPeerId !== null) {
            writer.write((this.savedPeerId as any).getBytes());
        }
        if (this.savedReaction !== undefined && this.savedReaction !== null) {
            writer.writeVector(this.savedReaction, (item) => {
                writer.write(item.getBytes());
            });
        }
        if (this.topMsgId !== undefined && this.topMsgId !== null) {
            writer.writeInt(this.topMsgId);
        }
        writer.write(this.filter.getBytes());
        writer.writeInt(this.minDate!);
        writer.writeInt(this.maxDate);
        writer.writeInt(this.offsetId);
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

    static fromReader(reader: BinaryReader): Search {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        const _q = reader.tgReadString();
        args.q = _q;
        if (args.flags & (1 << 0)) {
            const _fromId = reader.tgReadObject();
            args.fromId = _fromId;
        } else {
            args.fromId = undefined;
        }
        if (args.flags & (1 << 2)) {
            const _savedPeerId = reader.tgReadObject();
            args.savedPeerId = _savedPeerId;
        } else {
            args.savedPeerId = undefined;
        }
        if (args.flags & (1 << 3)) {
            const _savedReaction = reader.readVector((reader) => {
                const item = reader.tgReadObject();
                return item;
            });
            args.savedReaction = _savedReaction;
        } else {
            args.savedReaction = undefined;
        }
        if (args.flags & (1 << 1)) {
            const _topMsgId = reader.readInt();
            args.topMsgId = _topMsgId;
        } else {
            args.topMsgId = undefined;
        }
        const _filter = reader.tgReadObject();
        args.filter = _filter;
        const _minDate = reader.readInt();
        args.minDate = _minDate;
        const _maxDate = reader.readInt();
        args.maxDate = _maxDate;
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
        const _hash = reader.readLargeInt(64);
        args.hash = _hash;
        return new Search(args);
    }
}