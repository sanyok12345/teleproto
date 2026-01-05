import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { TypeSendAsPeers } from "../../types/channels/TypeSendAsPeers";

export class GetSendAs extends MTProtoRequest {
    static CONSTRUCTOR_ID = 3884295231;
    static SUBCLASS_OF_ID = 952864033;
    static className = "channels.GetSendAs";
    static classType = "request";

    flags?: number;
    forPaidReactions?: boolean;
    forLiveStories?: boolean;
    peer?: EntityLike;

    constructor(args: { flags?: number, forPaidReactions?: boolean, forLiveStories?: boolean, peer?: EntityLike } = {}) {
        super();
        this.flags = args.flags;
        this.forPaidReactions = args.forPaidReactions;
        this.forLiveStories = args.forLiveStories;
        this.peer = args.peer;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3884295231, false);
        let flags = 0;
        if (this.forPaidReactions) { flags |= 1 << 0; }
        if (this.forLiveStories) { flags |= 1 << 1; }
        writer.writeInt(flags, false);
        if (this.forPaidReactions !== undefined && this.forPaidReactions !== null) {
        }
        if (this.forLiveStories !== undefined && this.forLiveStories !== null) {
        }
        writer.write((this.peer! as any).getBytes());
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeSendAsPeers {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetSendAs {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _forPaidReactions = true;
            args.forPaidReactions = _forPaidReactions;
        } else {
            args.forPaidReactions = false;
        }
        if (args.flags & (1 << 1)) {
            const _forLiveStories = true;
            args.forLiveStories = _forLiveStories;
        } else {
            args.forLiveStories = false;
        }
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        return new GetSendAs(args);
    }
}