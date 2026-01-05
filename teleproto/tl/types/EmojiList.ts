import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class EmojiList extends TLObject {
    static CONSTRUCTOR_ID = 2048790993;
    static SUBCLASS_OF_ID = 3169807034;
    static className = "EmojiList";
    static classType = "constructor";

    hash!: bigint;
    documentId!: bigint[];

    constructor(args: { hash?: bigint, documentId?: bigint[] } = {}) {
        super();
        this.hash = args.hash!;
        this.documentId = args.documentId!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2048790993, false);
        writer.writeLargeInt(this.hash, 64);
        writer.writeVector(this.documentId, (item) => {
            writer.writeLargeInt(item, 64);
        });
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): EmojiList {
        const args: any = {};
        const _hash = reader.readLargeInt(64);
        args.hash = _hash;
        const _documentId = reader.readVector((reader) => {
            const item = reader.readLargeInt(64);
            return item;
        });
        args.documentId = _documentId;
        return new EmojiList(args);
    }
}