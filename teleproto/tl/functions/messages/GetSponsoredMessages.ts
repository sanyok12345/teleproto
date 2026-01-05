import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { MessageIDLike } from "../../types/../../define";
import { TypeSponsoredMessages } from "../../types/messages/TypeSponsoredMessages";

export class GetSponsoredMessages extends MTProtoRequest {
    static CONSTRUCTOR_ID = 1030547536;
    static SUBCLASS_OF_ID = 2134993376;
    static className = "messages.GetSponsoredMessages";
    static classType = "request";

    flags?: number;
    peer?: EntityLike;
    msgId?: MessageIDLike;

    constructor(args: { flags?: number, peer?: EntityLike, msgId?: MessageIDLike } = {}) {
        super();
        this.flags = args.flags;
        this.peer = args.peer;
        this.msgId = args.msgId;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1030547536, false);
        let flags = 0;
        if (this.msgId !== undefined && this.msgId !== null) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        writer.write((this.peer! as any).getBytes());
        if (this.msgId !== undefined && this.msgId !== null) {
            if (typeof this.msgId === 'number') {
                writer.writeInt(this.msgId);
            } else {
                writer.writeInt((this.msgId as any).id);
            }
        }
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeSponsoredMessages {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetSponsoredMessages {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        if (args.flags & (1 << 0)) {
            const _msgId = reader.tgReadObject();
            args.msgId = _msgId;
        } else {
            args.msgId = undefined;
        }
        return new GetSponsoredMessages(args);
    }
}