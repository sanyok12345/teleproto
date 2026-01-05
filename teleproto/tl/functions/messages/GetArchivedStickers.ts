import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeArchivedStickers } from "../../types/messages/TypeArchivedStickers";

export class GetArchivedStickers extends MTProtoRequest {
    static CONSTRUCTOR_ID = 1475442322;
    static SUBCLASS_OF_ID = 1922488177;
    static className = "messages.GetArchivedStickers";
    static classType = "request";

    flags?: number;
    masks?: boolean;
    emojis?: boolean;
    offsetId!: bigint;
    limit!: number;

    constructor(args: { flags?: number, masks?: boolean, emojis?: boolean, offsetId?: bigint, limit?: number } = {}) {
        super();
        this.flags = args.flags;
        this.masks = args.masks;
        this.emojis = args.emojis;
        this.offsetId = args.offsetId!;
        this.limit = args.limit!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1475442322, false);
        let flags = 0;
        if (this.masks) { flags |= 1 << 0; }
        if (this.emojis) { flags |= 1 << 1; }
        writer.writeInt(flags, false);
        if (this.masks !== undefined && this.masks !== null) {
        }
        if (this.emojis !== undefined && this.emojis !== null) {
        }
        writer.writeLargeInt(this.offsetId, 64);
        writer.writeInt(this.limit);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeArchivedStickers {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetArchivedStickers {
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
        const _offsetId = reader.readLargeInt(64);
        args.offsetId = _offsetId;
        const _limit = reader.readInt();
        args.limit = _limit;
        return new GetArchivedStickers(args);
    }
}