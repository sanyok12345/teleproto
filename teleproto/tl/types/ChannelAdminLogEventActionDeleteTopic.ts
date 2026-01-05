import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeForumTopic } from "./TypeForumTopic";

export class ChannelAdminLogEventActionDeleteTopic extends TLObject {
    static CONSTRUCTOR_ID = 2920712457;
    static SUBCLASS_OF_ID = 2998503411;
    static className = "ChannelAdminLogEventActionDeleteTopic";
    static classType = "constructor";

    topic!: TypeForumTopic;

    constructor(args: { topic?: TypeForumTopic } = {}) {
        super();
        this.topic = args.topic!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2920712457, false);
        writer.write(this.topic.getBytes());
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): ChannelAdminLogEventActionDeleteTopic {
        const args: any = {};
        const _topic = reader.tgReadObject();
        args.topic = _topic;
        return new ChannelAdminLogEventActionDeleteTopic(args);
    }
}