import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class EmojiKeywordDeleted extends TLObject {
    static CONSTRUCTOR_ID = 594408994;
    static SUBCLASS_OF_ID = 1712497982;
    static className = "EmojiKeywordDeleted";
    static classType = "constructor";

    keyword!: string;
    emoticons!: string[];

    constructor(args: { keyword?: string, emoticons?: string[] } = {}) {
        super();
        this.keyword = args.keyword!;
        this.emoticons = args.emoticons!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(594408994, false);
        writer.tgWriteString(this.keyword);
        writer.writeVector(this.emoticons, (item) => {
            writer.tgWriteString(item);
        });
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): EmojiKeywordDeleted {
        const args: any = {};
        const _keyword = reader.tgReadString();
        args.keyword = _keyword;
        const _emoticons = reader.readVector((reader) => {
            const item = reader.tgReadString();
            return item;
        });
        args.emoticons = _emoticons;
        return new EmojiKeywordDeleted(args);
    }
}