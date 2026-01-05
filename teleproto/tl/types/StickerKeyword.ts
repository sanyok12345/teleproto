import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class StickerKeyword extends TLObject {
    static CONSTRUCTOR_ID = 4244550300;
    static SUBCLASS_OF_ID = 1435835755;
    static className = "StickerKeyword";
    static classType = "constructor";

    documentId!: bigint;
    keyword!: string[];

    constructor(args: { documentId?: bigint, keyword?: string[] } = {}) {
        super();
        this.documentId = args.documentId!;
        this.keyword = args.keyword!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(4244550300, false);
        writer.writeLargeInt(this.documentId, 64);
        writer.writeVector(this.keyword, (item) => {
            writer.tgWriteString(item);
        });
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): StickerKeyword {
        const args: any = {};
        const _documentId = reader.readLargeInt(64);
        args.documentId = _documentId;
        const _keyword = reader.readVector((reader) => {
            const item = reader.tgReadString();
            return item;
        });
        args.keyword = _keyword;
        return new StickerKeyword(args);
    }
}