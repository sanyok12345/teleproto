import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class EmojiStatusCollectible extends TLObject {
    static CONSTRUCTOR_ID = 1904500795;
    static SUBCLASS_OF_ID = 4180717880;
    static className = "EmojiStatusCollectible";
    static classType = "constructor";

    flags!: number;
    collectibleId!: bigint;
    documentId!: bigint;
    title!: string;
    slug!: string;
    patternDocumentId!: bigint;
    centerColor!: number;
    edgeColor!: number;
    patternColor!: number;
    textColor!: number;
    until?: number;

    constructor(args: { flags?: number, collectibleId?: bigint, documentId?: bigint, title?: string, slug?: string, patternDocumentId?: bigint, centerColor?: number, edgeColor?: number, patternColor?: number, textColor?: number, until?: number } = {}) {
        super();
        this.flags = args.flags!;
        this.collectibleId = args.collectibleId!;
        this.documentId = args.documentId!;
        this.title = args.title!;
        this.slug = args.slug!;
        this.patternDocumentId = args.patternDocumentId!;
        this.centerColor = args.centerColor!;
        this.edgeColor = args.edgeColor!;
        this.patternColor = args.patternColor!;
        this.textColor = args.textColor!;
        this.until = args.until;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1904500795, false);
        let flags = 0;
        if (this.until !== undefined && this.until !== null) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        writer.writeLargeInt(this.collectibleId, 64);
        writer.writeLargeInt(this.documentId, 64);
        writer.tgWriteString(this.title);
        writer.tgWriteString(this.slug);
        writer.writeLargeInt(this.patternDocumentId, 64);
        writer.writeInt(this.centerColor);
        writer.writeInt(this.edgeColor);
        writer.writeInt(this.patternColor);
        writer.writeInt(this.textColor);
        if (this.until !== undefined && this.until !== null) {
            writer.writeInt(this.until);
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): EmojiStatusCollectible {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        const _collectibleId = reader.readLargeInt(64);
        args.collectibleId = _collectibleId;
        const _documentId = reader.readLargeInt(64);
        args.documentId = _documentId;
        const _title = reader.tgReadString();
        args.title = _title;
        const _slug = reader.tgReadString();
        args.slug = _slug;
        const _patternDocumentId = reader.readLargeInt(64);
        args.patternDocumentId = _patternDocumentId;
        const _centerColor = reader.readInt();
        args.centerColor = _centerColor;
        const _edgeColor = reader.readInt();
        args.edgeColor = _edgeColor;
        const _patternColor = reader.readInt();
        args.patternColor = _patternColor;
        const _textColor = reader.readInt();
        args.textColor = _textColor;
        if (args.flags & (1 << 0)) {
            const _until = reader.readInt();
            args.until = _until;
        } else {
            args.until = undefined;
        }
        return new EmojiStatusCollectible(args);
    }
}