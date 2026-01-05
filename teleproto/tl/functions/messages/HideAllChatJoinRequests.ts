import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { TypeUpdates } from "../../types/TypeUpdates";

export class HideAllChatJoinRequests extends MTProtoRequest {
    static CONSTRUCTOR_ID = 3766875370;
    static SUBCLASS_OF_ID = 2331323052;
    static className = "messages.HideAllChatJoinRequests";
    static classType = "request";

    flags?: number;
    approved?: boolean;
    peer?: EntityLike;
    link?: string;

    constructor(args: { flags?: number, approved?: boolean, peer?: EntityLike, link?: string } = {}) {
        super();
        this.flags = args.flags;
        this.approved = args.approved;
        this.peer = args.peer;
        this.link = args.link;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3766875370, false);
        let flags = 0;
        if (this.approved) { flags |= 1 << 0; }
        if (this.link !== undefined && this.link !== null) { flags |= 1 << 1; }
        writer.writeInt(flags, false);
        if (this.approved !== undefined && this.approved !== null) {
        }
        writer.write((this.peer! as any).getBytes());
        if (this.link !== undefined && this.link !== null) {
            writer.tgWriteString(this.link);
        }
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeUpdates {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): HideAllChatJoinRequests {
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
        if (args.flags & (1 << 1)) {
            const _link = reader.tgReadString();
            args.link = _link;
        } else {
            args.link = undefined;
        }
        return new HideAllChatJoinRequests(args);
    }
}