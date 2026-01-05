import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeDialogPeer } from "./TypeDialogPeer";

export class UpdatePinnedDialogs extends TLObject {
    static CONSTRUCTOR_ID = 4195302562;
    static SUBCLASS_OF_ID = 2676568142;
    static className = "UpdatePinnedDialogs";
    static classType = "constructor";

    flags!: number;
    folderId?: number;
    order?: TypeDialogPeer[];

    constructor(args: { flags?: number, folderId?: number, order?: TypeDialogPeer[] } = {}) {
        super();
        this.flags = args.flags!;
        this.folderId = args.folderId;
        this.order = args.order;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(4195302562, false);
        let flags = 0;
        if (this.folderId !== undefined && this.folderId !== null) { flags |= 1 << 1; }
        if (this.order !== undefined && this.order !== null) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        if (this.folderId !== undefined && this.folderId !== null) {
            writer.writeInt(this.folderId);
        }
        if (this.order !== undefined && this.order !== null) {
            writer.writeVector(this.order, (item) => {
                writer.write(item.getBytes());
            });
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): UpdatePinnedDialogs {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 1)) {
            const _folderId = reader.readInt();
            args.folderId = _folderId;
        } else {
            args.folderId = undefined;
        }
        if (args.flags & (1 << 0)) {
            const _order = reader.readVector((reader) => {
                const item = reader.tgReadObject();
                return item;
            });
            args.order = _order;
        } else {
            args.order = undefined;
        }
        return new UpdatePinnedDialogs(args);
    }
}