import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeStickerSet } from "./TypeStickerSet";
import { TypeStickerPack } from "./TypeStickerPack";
import { TypeStickerKeyword } from "./TypeStickerKeyword";
import { TypeDocument } from "./TypeDocument";

export class StickerSetFullCovered extends TLObject {
    static CONSTRUCTOR_ID = 1087454222;
    static SUBCLASS_OF_ID = 2139546853;
    static className = "StickerSetFullCovered";
    static classType = "constructor";

    set!: TypeStickerSet;
    packs!: TypeStickerPack[];
    keywords!: TypeStickerKeyword[];
    documents!: TypeDocument[];

    constructor(args: { set?: TypeStickerSet, packs?: TypeStickerPack[], keywords?: TypeStickerKeyword[], documents?: TypeDocument[] } = {}) {
        super();
        this.set = args.set!;
        this.packs = args.packs!;
        this.keywords = args.keywords!;
        this.documents = args.documents!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1087454222, false);
        writer.write(this.set.getBytes());
        writer.writeVector(this.packs, (item) => {
            writer.write(item.getBytes());
        });
        writer.writeVector(this.keywords, (item) => {
            writer.write(item.getBytes());
        });
        writer.writeVector(this.documents, (item) => {
            writer.write(item.getBytes());
        });
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): StickerSetFullCovered {
        const args: any = {};
        const _set = reader.tgReadObject();
        args.set = _set;
        const _packs = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.packs = _packs;
        const _keywords = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.keywords = _keywords;
        const _documents = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.documents = _documents;
        return new StickerSetFullCovered(args);
    }
}