import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { MessageIDLike } from "./../../define";

export class PostInteractionCountersMessage extends TLObject {
    static CONSTRUCTOR_ID = 3875901055;
    static SUBCLASS_OF_ID = 1850361243;
    static className = "PostInteractionCountersMessage";
    static classType = "constructor";

    msgId!: MessageIDLike;
    views!: number;
    forwards!: number;
    reactions!: number;

    constructor(args: { msgId?: MessageIDLike, views?: number, forwards?: number, reactions?: number } = {}) {
        super();
        this.msgId = args.msgId!;
        this.views = args.views!;
        this.forwards = args.forwards!;
        this.reactions = args.reactions!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3875901055, false);
        if (typeof this.msgId === 'number') {
            writer.writeInt(this.msgId);
        } else {
            writer.writeInt((this.msgId as any).id);
        }
        writer.writeInt(this.views);
        writer.writeInt(this.forwards);
        writer.writeInt(this.reactions);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): PostInteractionCountersMessage {
        const args: any = {};
        const _msgId = reader.tgReadObject();
        args.msgId = _msgId;
        const _views = reader.readInt();
        args.views = _views;
        const _forwards = reader.readInt();
        args.forwards = _forwards;
        const _reactions = reader.readInt();
        args.reactions = _reactions;
        return new PostInteractionCountersMessage(args);
    }
}