import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class StickerPack extends TLObject {
    static CONSTRUCTOR_ID = 313694676;
    static SUBCLASS_OF_ID = 2683282644;
    static className = "StickerPack";
    static classType = "constructor";

    emoticon!: string;
    documents!: bigint[];

    constructor(args: { emoticon?: string, documents?: bigint[] } = {}) {
        super();
        this.emoticon = args.emoticon!;
        this.documents = args.documents!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(313694676, false);
        writer.tgWriteString(this.emoticon);
        writer.writeVector(this.documents, (item) => {
            writer.writeLargeInt(item, 64);
        });
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): StickerPack {
        const args: any = {};
        const _emoticon = reader.tgReadString();
        args.emoticon = _emoticon;
        const _documents = reader.readVector((reader) => {
            const item = reader.readLargeInt(64);
            return item;
        });
        args.documents = _documents;
        return new StickerPack(args);
    }
}