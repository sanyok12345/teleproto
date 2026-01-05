import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeInputPeer } from "./TypeInputPeer";
import { MessageIDLike } from "./../../define";

export class InputPeerChannelFromMessage extends TLObject {
    static CONSTRUCTOR_ID = 3173648448;
    static SUBCLASS_OF_ID = 3374092470;
    static className = "InputPeerChannelFromMessage";
    static classType = "constructor";

    peer!: TypeInputPeer;
    msgId!: MessageIDLike;
    channelId!: bigint;

    constructor(args: { peer?: TypeInputPeer, msgId?: MessageIDLike, channelId?: bigint } = {}) {
        super();
        this.peer = args.peer!;
        this.msgId = args.msgId!;
        this.channelId = args.channelId!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3173648448, false);
        writer.write(this.peer.getBytes());
        if (typeof this.msgId === 'number') {
            writer.writeInt(this.msgId);
        } else {
            writer.writeInt((this.msgId as any).id);
        }
        writer.writeLargeInt(this.channelId, 64);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputPeerChannelFromMessage {
        const args: any = {};
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        const _msgId = reader.tgReadObject();
        args.msgId = _msgId;
        const _channelId = reader.readLargeInt(64);
        args.channelId = _channelId;
        return new InputPeerChannelFromMessage(args);
    }
}