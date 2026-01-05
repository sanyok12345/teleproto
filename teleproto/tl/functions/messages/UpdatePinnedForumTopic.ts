import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { TypeUpdates } from "../../types/TypeUpdates";

export class UpdatePinnedForumTopic extends MTProtoRequest {
    static CONSTRUCTOR_ID = 392032849;
    static SUBCLASS_OF_ID = 2331323052;
    static className = "messages.UpdatePinnedForumTopic";
    static classType = "request";

    peer?: EntityLike;
    topicId!: number;
    pinned!: boolean;

    constructor(args: { peer?: EntityLike, topicId?: number, pinned?: boolean } = {}) {
        super();
        this.peer = args.peer;
        this.topicId = args.topicId!;
        this.pinned = args.pinned!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(392032849, false);
        writer.write((this.peer! as any).getBytes());
        writer.writeInt(this.topicId);
        writer.tgWriteBool(this.pinned);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeUpdates {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): UpdatePinnedForumTopic {
        const args: any = {};
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        const _topicId = reader.readInt();
        args.topicId = _topicId;
        const _pinned = reader.tgReadBool();
        args.pinned = _pinned;
        return new UpdatePinnedForumTopic(args);
    }
}