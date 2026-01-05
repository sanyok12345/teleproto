import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeForumTopic } from "./TypeForumTopic";

export class ChannelAdminLogEventActionCreateTopic extends TLObject {
    static CONSTRUCTOR_ID = 1483767080;
    static SUBCLASS_OF_ID = 2998503411;
    static className = "ChannelAdminLogEventActionCreateTopic";
    static classType = "constructor";

    topic!: TypeForumTopic;

    constructor(args: { topic?: TypeForumTopic } = {}) {
        super();
        this.topic = args.topic!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1483767080, false);
        writer.write(this.topic.getBytes());
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): ChannelAdminLogEventActionCreateTopic {
        const args: any = {};
        const _topic = reader.tgReadObject();
        args.topic = _topic;
        return new ChannelAdminLogEventActionCreateTopic(args);
    }
}