import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeDialogPeer } from "./TypeDialogPeer";
import { TypePeer } from "./TypePeer";

export class UpdateDialogUnreadMark extends TLObject {
    static CONSTRUCTOR_ID = 3059282494;
    static SUBCLASS_OF_ID = 2676568142;
    static className = "UpdateDialogUnreadMark";
    static classType = "constructor";

    flags!: number;
    unread?: boolean;
    peer!: TypeDialogPeer;
    savedPeerId?: TypePeer;

    constructor(args: { flags?: number, unread?: boolean, peer?: TypeDialogPeer, savedPeerId?: TypePeer } = {}) {
        super();
        this.flags = args.flags!;
        this.unread = args.unread;
        this.peer = args.peer!;
        this.savedPeerId = args.savedPeerId;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3059282494, false);
        let flags = 0;
        if (this.unread) { flags |= 1 << 0; }
        if (this.savedPeerId !== undefined && this.savedPeerId !== null) { flags |= 1 << 1; }
        writer.writeInt(flags, false);
        if (this.unread !== undefined && this.unread !== null) {
        }
        writer.write(this.peer.getBytes());
        if (this.savedPeerId !== undefined && this.savedPeerId !== null) {
            writer.write(this.savedPeerId.getBytes());
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): UpdateDialogUnreadMark {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _unread = true;
            args.unread = _unread;
        } else {
            args.unread = false;
        }
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        if (args.flags & (1 << 1)) {
            const _savedPeerId = reader.tgReadObject();
            args.savedPeerId = _savedPeerId;
        } else {
            args.savedPeerId = undefined;
        }
        return new UpdateDialogUnreadMark(args);
    }
}