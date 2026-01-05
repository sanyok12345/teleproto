import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeDialogPeer } from "./TypeDialogPeer";

export class UpdatePinnedSavedDialogs extends TLObject {
    static CONSTRUCTOR_ID = 1751942566;
    static SUBCLASS_OF_ID = 2676568142;
    static className = "UpdatePinnedSavedDialogs";
    static classType = "constructor";

    flags!: number;
    order?: TypeDialogPeer[];

    constructor(args: { flags?: number, order?: TypeDialogPeer[] } = {}) {
        super();
        this.flags = args.flags!;
        this.order = args.order;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1751942566, false);
        let flags = 0;
        if (this.order !== undefined && this.order !== null) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        if (this.order !== undefined && this.order !== null) {
            writer.writeVector(this.order, (item) => {
                writer.write(item.getBytes());
            });
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): UpdatePinnedSavedDialogs {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _order = reader.readVector((reader) => {
                const item = reader.tgReadObject();
                return item;
            });
            args.order = _order;
        } else {
            args.order = undefined;
        }
        return new UpdatePinnedSavedDialogs(args);
    }
}