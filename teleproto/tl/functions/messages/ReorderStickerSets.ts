import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";

export class ReorderStickerSets extends MTProtoRequest {
    static CONSTRUCTOR_ID = 2016638777;
    static SUBCLASS_OF_ID = 4122188204;
    static className = "messages.ReorderStickerSets";
    static classType = "request";

    flags?: number;
    masks?: boolean;
    emojis?: boolean;
    order!: bigint[];

    constructor(args: { flags?: number, masks?: boolean, emojis?: boolean, order?: bigint[] } = {}) {
        super();
        this.flags = args.flags;
        this.masks = args.masks;
        this.emojis = args.emojis;
        this.order = args.order!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2016638777, false);
        let flags = 0;
        if (this.masks) { flags |= 1 << 0; }
        if (this.emojis) { flags |= 1 << 1; }
        writer.writeInt(flags, false);
        if (this.masks !== undefined && this.masks !== null) {
        }
        if (this.emojis !== undefined && this.emojis !== null) {
        }
        writer.writeVector(this.order, (item) => {
            writer.writeLargeInt(item, 64);
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

    static fromReader(reader: BinaryReader): ReorderStickerSets {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _masks = true;
            args.masks = _masks;
        } else {
            args.masks = false;
        }
        if (args.flags & (1 << 1)) {
            const _emojis = true;
            args.emojis = _emojis;
        } else {
            args.emojis = false;
        }
        const _order = reader.readVector((reader) => {
            const item = reader.readLargeInt(64);
            return item;
        });
        args.order = _order;
        return new ReorderStickerSets(args);
    }
}