import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeDialogPeer } from "./TypeDialogPeer";

export class UpdateSavedDialogPinned extends TLObject {
    static CONSTRUCTOR_ID = 2930744948;
    static SUBCLASS_OF_ID = 2676568142;
    static className = "UpdateSavedDialogPinned";
    static classType = "constructor";

    flags!: number;
    pinned?: boolean;
    peer!: TypeDialogPeer;

    constructor(args: { flags?: number, pinned?: boolean, peer?: TypeDialogPeer } = {}) {
        super();
        this.flags = args.flags!;
        this.pinned = args.pinned;
        this.peer = args.peer!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2930744948, false);
        let flags = 0;
        if (this.pinned) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        if (this.pinned !== undefined && this.pinned !== null) {
        }
        writer.write(this.peer.getBytes());
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): UpdateSavedDialogPinned {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _pinned = true;
            args.pinned = _pinned;
        } else {
            args.pinned = false;
        }
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        return new UpdateSavedDialogPinned(args);
    }
}