import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeInputDialogPeer } from "../../types/TypeInputDialogPeer";

export class ReorderPinnedDialogs extends MTProtoRequest {
    static CONSTRUCTOR_ID = 991616823;
    static SUBCLASS_OF_ID = 4122188204;
    static className = "messages.ReorderPinnedDialogs";
    static classType = "request";

    flags?: number;
    force?: boolean;
    folderId!: number;
    order!: TypeInputDialogPeer[];

    constructor(args: { flags?: number, force?: boolean, folderId?: number, order?: TypeInputDialogPeer[] } = {}) {
        super();
        this.flags = args.flags;
        this.force = args.force;
        this.folderId = args.folderId!;
        this.order = args.order!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(991616823, false);
        let flags = 0;
        if (this.force) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        if (this.force !== undefined && this.force !== null) {
        }
        writer.writeInt(this.folderId);
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

    static fromReader(reader: BinaryReader): ReorderPinnedDialogs {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _force = true;
            args.force = _force;
        } else {
            args.force = false;
        }
        const _folderId = reader.readInt();
        args.folderId = _folderId;
        const _order = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.order = _order;
        return new ReorderPinnedDialogs(args);
    }
}