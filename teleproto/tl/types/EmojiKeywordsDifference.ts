import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeEmojiKeyword } from "./TypeEmojiKeyword";

export class EmojiKeywordsDifference extends TLObject {
    static CONSTRUCTOR_ID = 1556570557;
    static SUBCLASS_OF_ID = 3531196018;
    static className = "EmojiKeywordsDifference";
    static classType = "constructor";

    langCode!: string;
    fromVersion!: number;
    version!: number;
    keywords!: TypeEmojiKeyword[];

    constructor(args: { langCode?: string, fromVersion?: number, version?: number, keywords?: TypeEmojiKeyword[] } = {}) {
        super();
        this.langCode = args.langCode!;
        this.fromVersion = args.fromVersion!;
        this.version = args.version!;
        this.keywords = args.keywords!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1556570557, false);
        writer.tgWriteString(this.langCode);
        writer.writeInt(this.fromVersion);
        writer.writeInt(this.version);
        writer.writeVector(this.keywords, (item) => {
            writer.write(item.getBytes());
        });
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): EmojiKeywordsDifference {
        const args: any = {};
        const _langCode = reader.tgReadString();
        args.langCode = _langCode;
        const _fromVersion = reader.readInt();
        args.fromVersion = _fromVersion;
        const _version = reader.readInt();
        args.version = _version;
        const _keywords = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.keywords = _keywords;
        return new EmojiKeywordsDifference(args);
    }
}