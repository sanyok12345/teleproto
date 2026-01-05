import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeFoundStickers } from "../../types/messages/TypeFoundStickers";

export class SearchStickers extends MTProtoRequest {
    static CONSTRUCTOR_ID = 699516522;
    static SUBCLASS_OF_ID = 104866129;
    static className = "messages.SearchStickers";
    static classType = "request";

    flags?: number;
    emojis?: boolean;
    q!: string;
    emoticon!: string;
    langCode?: string[];
    offset!: number;
    limit!: number;
    hash?: bigint;

    constructor(args: { flags?: number, emojis?: boolean, q?: string, emoticon?: string, langCode?: string[], offset?: number, limit?: number, hash?: bigint } = {}) {
        super();
        this.flags = args.flags;
        this.emojis = args.emojis;
        this.q = args.q!;
        this.emoticon = args.emoticon!;
        this.langCode = args.langCode;
        this.offset = args.offset!;
        this.limit = args.limit!;
        this.hash = args.hash;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(699516522, false);
        let flags = 0;
        if (this.emojis) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        if (this.emojis !== undefined && this.emojis !== null) {
        }
        writer.tgWriteString(this.q);
        writer.tgWriteString(this.emoticon);
        writer.writeVector(this.langCode!, (item) => {
            writer.tgWriteString(item);
        });
        writer.writeInt(this.offset);
        writer.writeInt(this.limit);
        writer.writeLargeInt(this.hash!, 64);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeFoundStickers {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): SearchStickers {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _emojis = true;
            args.emojis = _emojis;
        } else {
            args.emojis = false;
        }
        const _q = reader.tgReadString();
        args.q = _q;
        const _emoticon = reader.tgReadString();
        args.emoticon = _emoticon;
        const _langCode = reader.readVector((reader) => {
            const item = reader.tgReadString();
            return item;
        });
        args.langCode = _langCode;
        const _offset = reader.readInt();
        args.offset = _offset;
        const _limit = reader.readInt();
        args.limit = _limit;
        const _hash = reader.readLargeInt(64);
        args.hash = _hash;
        return new SearchStickers(args);
    }
}