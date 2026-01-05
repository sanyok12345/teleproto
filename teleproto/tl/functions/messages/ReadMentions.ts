import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { TypeAffectedHistory } from "../../types/messages/TypeAffectedHistory";

export class ReadMentions extends MTProtoRequest {
    static CONSTRUCTOR_ID = 921026381;
    static SUBCLASS_OF_ID = 743031062;
    static className = "messages.ReadMentions";
    static classType = "request";

    flags?: number;
    peer?: EntityLike;
    topMsgId?: number;

    constructor(args: { flags?: number, peer?: EntityLike, topMsgId?: number } = {}) {
        super();
        this.flags = args.flags;
        this.peer = args.peer;
        this.topMsgId = args.topMsgId;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(921026381, false);
        let flags = 0;
        if (this.topMsgId !== undefined && this.topMsgId !== null) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        writer.write((this.peer! as any).getBytes());
        if (this.topMsgId !== undefined && this.topMsgId !== null) {
            writer.writeInt(this.topMsgId);
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

    static fromReader(reader: BinaryReader): ReadMentions {
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
        return new ReadMentions(args);
    }
}