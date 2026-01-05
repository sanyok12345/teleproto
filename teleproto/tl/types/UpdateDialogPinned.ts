import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeDialogPeer } from "./TypeDialogPeer";

export class UpdateDialogPinned extends TLObject {
    static CONSTRUCTOR_ID = 1852826908;
    static SUBCLASS_OF_ID = 2676568142;
    static className = "UpdateDialogPinned";
    static classType = "constructor";

    flags!: number;
    pinned?: boolean;
    folderId?: number;
    peer!: TypeDialogPeer;

    constructor(args: { flags?: number, pinned?: boolean, folderId?: number, peer?: TypeDialogPeer } = {}) {
        super();
        this.flags = args.flags!;
        this.pinned = args.pinned;
        this.folderId = args.folderId;
        this.peer = args.peer!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1852826908, false);
        let flags = 0;
        if (this.pinned) { flags |= 1 << 0; }
        if (this.folderId !== undefined && this.folderId !== null) { flags |= 1 << 1; }
        writer.writeInt(flags, false);
        if (this.pinned !== undefined && this.pinned !== null) {
        }
        if (this.folderId !== undefined && this.folderId !== null) {
            writer.writeInt(this.folderId);
        }
        writer.write(this.peer.getBytes());
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): UpdateDialogPinned {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _pinned = true;
            args.pinned = _pinned;
        } else {
            args.pinned = false;
        }
        if (args.flags & (1 << 1)) {
            const _folderId = reader.readInt();
            args.folderId = _folderId;
        } else {
            args.folderId = undefined;
        }
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        return new UpdateDialogPinned(args);
    }
}