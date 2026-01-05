import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeForumTopic } from "./TypeForumTopic";

export class ChannelAdminLogEventActionPinTopic extends TLObject {
    static CONSTRUCTOR_ID = 1569535291;
    static SUBCLASS_OF_ID = 2998503411;
    static className = "ChannelAdminLogEventActionPinTopic";
    static classType = "constructor";

    flags!: number;
    prevTopic?: TypeForumTopic;
    newTopic?: TypeForumTopic;

    constructor(args: { flags?: number, prevTopic?: TypeForumTopic, newTopic?: TypeForumTopic } = {}) {
        super();
        this.flags = args.flags!;
        this.prevTopic = args.prevTopic;
        this.newTopic = args.newTopic;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1569535291, false);
        let flags = 0;
        if (this.prevTopic !== undefined && this.prevTopic !== null) { flags |= 1 << 0; }
        if (this.newTopic !== undefined && this.newTopic !== null) { flags |= 1 << 1; }
        writer.writeInt(flags, false);
        if (this.prevTopic !== undefined && this.prevTopic !== null) {
            writer.write(this.prevTopic.getBytes());
        }
        if (this.newTopic !== undefined && this.newTopic !== null) {
            writer.write(this.newTopic.getBytes());
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): ChannelAdminLogEventActionPinTopic {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _prevTopic = reader.tgReadObject();
            args.prevTopic = _prevTopic;
        } else {
            args.prevTopic = undefined;
        }
        if (args.flags & (1 << 1)) {
            const _newTopic = reader.tgReadObject();
            args.newTopic = _newTopic;
        } else {
            args.newTopic = undefined;
        }
        return new ChannelAdminLogEventActionPinTopic(args);
    }
}