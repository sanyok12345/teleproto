import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypePeer } from "./TypePeer";
import { MessageIDLike } from "./../../define";
import { TypeMessageExtendedMedia } from "./TypeMessageExtendedMedia";

export class UpdateMessageExtendedMedia extends TLObject {
    static CONSTRUCTOR_ID = 3584300836;
    static SUBCLASS_OF_ID = 2676568142;
    static className = "UpdateMessageExtendedMedia";
    static classType = "constructor";

    peer!: TypePeer;
    msgId!: MessageIDLike;
    extendedMedia!: TypeMessageExtendedMedia[];

    constructor(args: { peer?: TypePeer, msgId?: MessageIDLike, extendedMedia?: TypeMessageExtendedMedia[] } = {}) {
        super();
        this.peer = args.peer!;
        this.msgId = args.msgId!;
        this.extendedMedia = args.extendedMedia!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3584300836, false);
        writer.write(this.peer.getBytes());
        if (typeof this.msgId === 'number') {
            writer.writeInt(this.msgId);
        } else {
            writer.writeInt((this.msgId as any).id);
        }
        writer.writeVector(this.extendedMedia, (item) => {
            writer.write(item.getBytes());
        });
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): UpdateMessageExtendedMedia {
        const args: any = {};
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        const _msgId = reader.tgReadObject();
        args.msgId = _msgId;
        const _extendedMedia = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.extendedMedia = _extendedMedia;
        return new UpdateMessageExtendedMedia(args);
    }
}