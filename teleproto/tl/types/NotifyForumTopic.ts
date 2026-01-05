import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypePeer } from "./TypePeer";

export class NotifyForumTopic extends TLObject {
    static CONSTRUCTOR_ID = 577659656;
    static SUBCLASS_OF_ID = 3756548142;
    static className = "NotifyForumTopic";
    static classType = "constructor";

    peer!: TypePeer;
    topMsgId!: number;

    constructor(args: { peer?: TypePeer, topMsgId?: number } = {}) {
        super();
        this.peer = args.peer!;
        this.topMsgId = args.topMsgId!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(577659656, false);
        writer.write(this.peer.getBytes());
        writer.writeInt(this.topMsgId);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): NotifyForumTopic {
        const args: any = {};
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        const _topMsgId = reader.readInt();
        args.topMsgId = _topMsgId;
        return new NotifyForumTopic(args);
    }
}