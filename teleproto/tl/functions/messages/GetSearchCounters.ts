import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { TypeMessagesFilter } from "../../types/TypeMessagesFilter";
import { TypeSearchCounter } from "../../types/messages/TypeSearchCounter";

export class GetSearchCounters extends MTProtoRequest {
    static CONSTRUCTOR_ID = 465367808;
    static SUBCLASS_OF_ID = 1809726574;
    static className = "messages.GetSearchCounters";
    static classType = "request";

    flags?: number;
    peer?: EntityLike;
    savedPeerId?: EntityLike;
    topMsgId?: number;
    filters!: TypeMessagesFilter[];

    constructor(args: { flags?: number, peer?: EntityLike, savedPeerId?: EntityLike, topMsgId?: number, filters?: TypeMessagesFilter[] } = {}) {
        super();
        this.flags = args.flags;
        this.peer = args.peer;
        this.savedPeerId = args.savedPeerId;
        this.topMsgId = args.topMsgId;
        this.filters = args.filters!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(465367808, false);
        let flags = 0;
        if (this.savedPeerId !== undefined && this.savedPeerId !== null) { flags |= 1 << 2; }
        if (this.topMsgId !== undefined && this.topMsgId !== null) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        writer.write((this.peer! as any).getBytes());
        if (this.savedPeerId !== undefined && this.savedPeerId !== null) {
            writer.write((this.savedPeerId as any).getBytes());
        }
        if (this.topMsgId !== undefined && this.topMsgId !== null) {
            writer.writeInt(this.topMsgId);
        }
        writer.writeVector(this.filters, (item) => {
            writer.write(item.getBytes());
        });
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeSearchCounter[] {
        const result = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetSearchCounters {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        if (args.flags & (1 << 2)) {
            const _savedPeerId = reader.tgReadObject();
            args.savedPeerId = _savedPeerId;
        } else {
            args.savedPeerId = undefined;
        }
        if (args.flags & (1 << 0)) {
            const _topMsgId = reader.readInt();
            args.topMsgId = _topMsgId;
        } else {
            args.topMsgId = undefined;
        }
        const _filters = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.filters = _filters;
        return new GetSearchCounters(args);
    }
}