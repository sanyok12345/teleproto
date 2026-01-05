import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypePeer } from "./TypePeer";

export class MessageReplyStoryHeader extends TLObject {
    static CONSTRUCTOR_ID = 240843065;
    static SUBCLASS_OF_ID = 1531810151;
    static className = "MessageReplyStoryHeader";
    static classType = "constructor";

    peer!: TypePeer;
    storyId!: number;

    constructor(args: { peer?: TypePeer, storyId?: number } = {}) {
        super();
        this.peer = args.peer!;
        this.storyId = args.storyId!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(240843065, false);
        writer.write(this.peer.getBytes());
        writer.writeInt(this.storyId);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): MessageReplyStoryHeader {
        const args: any = {};
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        const _storyId = reader.readInt();
        args.storyId = _storyId;
        return new MessageReplyStoryHeader(args);
    }
}