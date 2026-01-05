import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class EmojiKeyword extends TLObject {
    static CONSTRUCTOR_ID = 3585325561;
    static SUBCLASS_OF_ID = 1712497982;
    static className = "EmojiKeyword";
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
        writer.writeInt(3585325561, false);
        writer.tgWriteString(this.keyword);
        writer.writeVector(this.emoticons, (item) => {
            writer.tgWriteString(item);
        });
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): EmojiKeyword {
        const args: any = {};
        const _keyword = reader.tgReadString();
        args.keyword = _keyword;
        const _emoticons = reader.readVector((reader) => {
            const item = reader.tgReadString();
            return item;
        });
        args.emoticons = _emoticons;
        return new EmojiKeyword(args);
    }
}