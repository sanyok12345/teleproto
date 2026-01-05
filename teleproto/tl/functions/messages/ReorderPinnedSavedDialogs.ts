import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeInputDialogPeer } from "../../types/TypeInputDialogPeer";

export class ReorderPinnedSavedDialogs extends MTProtoRequest {
    static CONSTRUCTOR_ID = 2339464583;
    static SUBCLASS_OF_ID = 4122188204;
    static className = "messages.ReorderPinnedSavedDialogs";
    static classType = "request";

    flags?: number;
    force?: boolean;
    order!: TypeInputDialogPeer[];

    constructor(args: { flags?: number, force?: boolean, order?: TypeInputDialogPeer[] } = {}) {
        super();
        this.flags = args.flags;
        this.force = args.force;
        this.order = args.order!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2339464583, false);
        let flags = 0;
        if (this.force) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        if (this.force !== undefined && this.force !== null) {
        }
        writer.writeVector(this.order, (item) => {
            writer.write(item.getBytes());
        });
        return writer.getValue();
    }

    readResult(reader: BinaryReader): boolean {
        const result = reader.tgReadBool();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): ReorderPinnedSavedDialogs {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _force = true;
            args.force = _force;
        } else {
            args.force = false;
        }
        const _order = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.order = _order;
        return new ReorderPinnedSavedDialogs(args);
    }
}