import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeForumTopic } from "./TypeForumTopic";

export class ChannelAdminLogEventActionEditTopic extends TLObject {
    static CONSTRUCTOR_ID = 4033864200;
    static SUBCLASS_OF_ID = 2998503411;
    static className = "ChannelAdminLogEventActionEditTopic";
    static classType = "constructor";

    prevTopic!: TypeForumTopic;
    newTopic!: TypeForumTopic;

    constructor(args: { prevTopic?: TypeForumTopic, newTopic?: TypeForumTopic } = {}) {
        super();
        this.prevTopic = args.prevTopic!;
        this.newTopic = args.newTopic!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(4033864200, false);
        writer.write(this.prevTopic.getBytes());
        writer.write(this.newTopic.getBytes());
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): ChannelAdminLogEventActionEditTopic {
        const args: any = {};
        const _prevTopic = reader.tgReadObject();
        args.prevTopic = _prevTopic;
        const _newTopic = reader.tgReadObject();
        args.newTopic = _newTopic;
        return new ChannelAdminLogEventActionEditTopic(args);
    }
}