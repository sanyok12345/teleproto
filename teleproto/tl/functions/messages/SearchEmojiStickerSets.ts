import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeFoundStickerSets } from "../../types/messages/TypeFoundStickerSets";

export class SearchEmojiStickerSets extends MTProtoRequest {
    static CONSTRUCTOR_ID = 2461288780;
    static SUBCLASS_OF_ID = 68023137;
    static className = "messages.SearchEmojiStickerSets";
    static classType = "request";

    flags?: number;
    excludeFeatured?: boolean;
    q!: string;
    hash?: bigint;

    constructor(args: { flags?: number, excludeFeatured?: boolean, q?: string, hash?: bigint } = {}) {
        super();
        this.flags = args.flags;
        this.excludeFeatured = args.excludeFeatured;
        this.q = args.q!;
        this.hash = args.hash;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2461288780, false);
        let flags = 0;
        if (this.excludeFeatured) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        if (this.excludeFeatured !== undefined && this.excludeFeatured !== null) {
        }
        writer.tgWriteString(this.q);
        writer.writeLargeInt(this.hash!, 64);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeFoundStickerSets {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): SearchEmojiStickerSets {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _excludeFeatured = true;
            args.excludeFeatured = _excludeFeatured;
        } else {
            args.excludeFeatured = false;
        }
        const _q = reader.tgReadString();
        args.q = _q;
        const _hash = reader.readLargeInt(64);
        args.hash = _hash;
        return new SearchEmojiStickerSets(args);
    }
}