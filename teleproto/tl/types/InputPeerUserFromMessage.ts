import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeInputPeer } from "./TypeInputPeer";
import { MessageIDLike } from "./../../define";

export class InputPeerUserFromMessage extends TLObject {
    static CONSTRUCTOR_ID = 2826635804;
    static SUBCLASS_OF_ID = 3374092470;
    static className = "InputPeerUserFromMessage";
    static classType = "constructor";

    peer!: TypeInputPeer;
    msgId!: MessageIDLike;
    userId!: bigint;

    constructor(args: { peer?: TypeInputPeer, msgId?: MessageIDLike, userId?: bigint } = {}) {
        super();
        this.peer = args.peer!;
        this.msgId = args.msgId!;
        this.userId = args.userId!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2826635804, false);
        writer.write(this.peer.getBytes());
        if (typeof this.msgId === 'number') {
            writer.writeInt(this.msgId);
        } else {
            writer.writeInt((this.msgId as any).id);
        }
        writer.writeLargeInt(this.userId, 64);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputPeerUserFromMessage {
        const args: any = {};
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        const _msgId = reader.tgReadObject();
        args.msgId = _msgId;
        const _userId = reader.readLargeInt(64);
        args.userId = _userId;
        return new InputPeerUserFromMessage(args);
    }
}