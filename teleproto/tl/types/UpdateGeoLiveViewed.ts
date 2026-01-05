import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypePeer } from "./TypePeer";
import { MessageIDLike } from "./../../define";

export class UpdateGeoLiveViewed extends TLObject {
    static CONSTRUCTOR_ID = 2267003193;
    static SUBCLASS_OF_ID = 2676568142;
    static className = "UpdateGeoLiveViewed";
    static classType = "constructor";

    peer!: TypePeer;
    msgId!: MessageIDLike;

    constructor(args: { peer?: TypePeer, msgId?: MessageIDLike } = {}) {
        super();
        this.peer = args.peer!;
        this.msgId = args.msgId!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2267003193, false);
        writer.write(this.peer.getBytes());
        if (typeof this.msgId === 'number') {
            writer.writeInt(this.msgId);
        } else {
            writer.writeInt((this.msgId as any).id);
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): UpdateGeoLiveViewed {
        const args: any = {};
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        const _msgId = reader.tgReadObject();
        args.msgId = _msgId;
        return new UpdateGeoLiveViewed(args);
    }
}