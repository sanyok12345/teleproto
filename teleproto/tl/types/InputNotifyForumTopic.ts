import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeInputPeer } from "./TypeInputPeer";

export class InputNotifyForumTopic extends TLObject {
    static CONSTRUCTOR_ID = 1548122514;
    static SUBCLASS_OF_ID = 1486362133;
    static className = "InputNotifyForumTopic";
    static classType = "constructor";

    peer!: TypeInputPeer;
    topMsgId!: number;

    constructor(args: { peer?: TypeInputPeer, topMsgId?: number } = {}) {
        super();
        this.peer = args.peer!;
        this.topMsgId = args.topMsgId!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1548122514, false);
        writer.write(this.peer.getBytes());
        writer.writeInt(this.topMsgId);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputNotifyForumTopic {
        const args: any = {};
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        const _topMsgId = reader.readInt();
        args.topMsgId = _topMsgId;
        return new InputNotifyForumTopic(args);
    }
}