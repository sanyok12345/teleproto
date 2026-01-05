import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeInputDocument } from "./TypeInputDocument";
import { TypeMaskCoords } from "./TypeMaskCoords";

export class InputStickerSetItem extends TLObject {
    static CONSTRUCTOR_ID = 853188252;
    static SUBCLASS_OF_ID = 2925129845;
    static className = "InputStickerSetItem";
    static classType = "constructor";

    flags!: number;
    document!: TypeInputDocument;
    emoji!: string;
    maskCoords?: TypeMaskCoords;
    keywords?: string;

    constructor(args: { flags?: number, document?: TypeInputDocument, emoji?: string, maskCoords?: TypeMaskCoords, keywords?: string } = {}) {
        super();
        this.flags = args.flags!;
        this.document = args.document!;
        this.emoji = args.emoji!;
        this.maskCoords = args.maskCoords;
        this.keywords = args.keywords;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(853188252, false);
        let flags = 0;
        if (this.maskCoords !== undefined && this.maskCoords !== null) { flags |= 1 << 0; }
        if (this.keywords !== undefined && this.keywords !== null) { flags |= 1 << 1; }
        writer.writeInt(flags, false);
        writer.write(this.document.getBytes());
        writer.tgWriteString(this.emoji);
        if (this.maskCoords !== undefined && this.maskCoords !== null) {
            writer.write(this.maskCoords.getBytes());
        }
        if (this.keywords !== undefined && this.keywords !== null) {
            writer.tgWriteString(this.keywords);
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputStickerSetItem {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        const _document = reader.tgReadObject();
        args.document = _document;
        const _emoji = reader.tgReadString();
        args.emoji = _emoji;
        if (args.flags & (1 << 0)) {
            const _maskCoords = reader.tgReadObject();
            args.maskCoords = _maskCoords;
        } else {
            args.maskCoords = undefined;
        }
        if (args.flags & (1 << 1)) {
            const _keywords = reader.tgReadString();
            args.keywords = _keywords;
        } else {
            args.keywords = undefined;
        }
        return new InputStickerSetItem(args);
    }
}