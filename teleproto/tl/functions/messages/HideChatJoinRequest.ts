import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { TypeUpdates } from "../../types/TypeUpdates";

export class HideChatJoinRequest extends MTProtoRequest {
    static CONSTRUCTOR_ID = 2145904661;
    static SUBCLASS_OF_ID = 2331323052;
    static className = "messages.HideChatJoinRequest";
    static classType = "request";

    flags?: number;
    approved?: boolean;
    peer?: EntityLike;
    userId!: EntityLike;

    constructor(args: { flags?: number, approved?: boolean, peer?: EntityLike, userId?: EntityLike } = {}) {
        super();
        this.flags = args.flags;
        this.approved = args.approved;
        this.peer = args.peer;
        this.userId = args.userId!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2145904661, false);
        let flags = 0;
        if (this.approved) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        if (this.approved !== undefined && this.approved !== null) {
        }
        writer.write((this.peer! as any).getBytes());
        writer.write((this.userId as any).getBytes());
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeUpdates {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): HideChatJoinRequest {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _approved = true;
            args.approved = _approved;
        } else {
            args.approved = false;
        }
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        const _userId = reader.tgReadObject();
        args.userId = _userId;
        return new HideChatJoinRequest(args);
    }
}