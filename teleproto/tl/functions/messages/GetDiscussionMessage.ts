import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { MessageIDLike } from "../../types/../../define";
import { TypeDiscussionMessage } from "../../types/messages/TypeDiscussionMessage";

export class GetDiscussionMessage extends MTProtoRequest {
    static CONSTRUCTOR_ID = 1147761405;
    static SUBCLASS_OF_ID = 1408820200;
    static className = "messages.GetDiscussionMessage";
    static classType = "request";

    peer?: EntityLike;
    msgId?: MessageIDLike;

    constructor(args: { peer?: EntityLike, msgId?: MessageIDLike } = {}) {
        super();
        this.peer = args.peer;
        this.msgId = args.msgId;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1147761405, false);
        writer.write((this.peer! as any).getBytes());
        if (typeof this.msgId! === 'number') {
            writer.writeInt(this.msgId!);
        } else {
            writer.writeInt((this.msgId! as any).id);
        }
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeDiscussionMessage {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetDiscussionMessage {
        const args: any = {};
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        const _msgId = reader.tgReadObject();
        args.msgId = _msgId;
        return new GetDiscussionMessage(args);
    }
}