import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { TypeAffectedHistory } from "../../types/messages/TypeAffectedHistory";

export class ReadReactions extends MTProtoRequest {
    static CONSTRUCTOR_ID = 2663665555;
    static SUBCLASS_OF_ID = 743031062;
    static className = "messages.ReadReactions";
    static classType = "request";

    flags?: number;
    peer?: EntityLike;
    topMsgId?: number;
    savedPeerId?: EntityLike;

    constructor(args: { flags?: number, peer?: EntityLike, topMsgId?: number, savedPeerId?: EntityLike } = {}) {
        super();
        this.flags = args.flags;
        this.peer = args.peer;
        this.topMsgId = args.topMsgId;
        this.savedPeerId = args.savedPeerId;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2663665555, false);
        let flags = 0;
        if (this.topMsgId !== undefined && this.topMsgId !== null) { flags |= 1 << 0; }
        if (this.savedPeerId !== undefined && this.savedPeerId !== null) { flags |= 1 << 1; }
        writer.writeInt(flags, false);
        writer.write((this.peer! as any).getBytes());
        if (this.topMsgId !== undefined && this.topMsgId !== null) {
            writer.writeInt(this.topMsgId);
        }
        if (this.savedPeerId !== undefined && this.savedPeerId !== null) {
            writer.write((this.savedPeerId as any).getBytes());
        }
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeAffectedHistory {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): ReadReactions {
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
        if (args.flags & (1 << 1)) {
            const _savedPeerId = reader.tgReadObject();
            args.savedPeerId = _savedPeerId;
        } else {
            args.savedPeerId = undefined;
        }
        return new ReadReactions(args);
    }
}