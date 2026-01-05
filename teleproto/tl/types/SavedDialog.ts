import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypePeer } from "./TypePeer";

export class SavedDialog extends TLObject {
    static CONSTRUCTOR_ID = 3179793260;
    static SUBCLASS_OF_ID = 599418118;
    static className = "SavedDialog";
    static classType = "constructor";

    flags!: number;
    pinned?: boolean;
    peer!: TypePeer;
    topMessage!: number;

    constructor(args: { flags?: number, pinned?: boolean, peer?: TypePeer, topMessage?: number } = {}) {
        super();
        this.flags = args.flags!;
        this.pinned = args.pinned;
        this.peer = args.peer!;
        this.topMessage = args.topMessage!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3179793260, false);
        let flags = 0;
        if (this.pinned) { flags |= 1 << 2; }
        writer.writeInt(flags, false);
        if (this.pinned !== undefined && this.pinned !== null) {
        }
        writer.write(this.peer.getBytes());
        writer.writeInt(this.topMessage);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): SavedDialog {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 2)) {
            const _pinned = true;
            args.pinned = _pinned;
        } else {
            args.pinned = false;
        }
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        const _topMessage = reader.readInt();
        args.topMessage = _topMessage;
        return new SavedDialog(args);
    }
}