import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { TypeAffectedHistory } from "../../types/messages/TypeAffectedHistory";

export class DeleteTopicHistory extends MTProtoRequest {
    static CONSTRUCTOR_ID = 3531697936;
    static SUBCLASS_OF_ID = 743031062;
    static className = "messages.DeleteTopicHistory";
    static classType = "request";

    peer?: EntityLike;
    topMsgId!: number;

    constructor(args: { peer?: EntityLike, topMsgId?: number } = {}) {
        super();
        this.peer = args.peer;
        this.topMsgId = args.topMsgId!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3531697936, false);
        writer.write((this.peer! as any).getBytes());
        writer.writeInt(this.topMsgId);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeAffectedHistory {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): DeleteTopicHistory {
        const args: any = {};
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        const _topMsgId = reader.readInt();
        args.topMsgId = _topMsgId;
        return new DeleteTopicHistory(args);
    }
}