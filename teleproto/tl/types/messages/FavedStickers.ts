import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";
import { TypeStickerPack } from "../TypeStickerPack";
import { TypeDocument } from "../TypeDocument";

export class FavedStickers extends TLObject {
    static CONSTRUCTOR_ID = 750063767;
    static SUBCLASS_OF_ID = 2389929913;
    static className = "messages.FavedStickers";
    static classType = "constructor";

    hash!: bigint;
    packs!: TypeStickerPack[];
    stickers!: TypeDocument[];

    constructor(args: { hash?: bigint, packs?: TypeStickerPack[], stickers?: TypeDocument[] } = {}) {
        super();
        this.hash = args.hash!;
        this.packs = args.packs!;
        this.stickers = args.stickers!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(750063767, false);
        writer.writeLargeInt(this.hash, 64);
        writer.writeVector(this.packs, (item) => {
            writer.write(item.getBytes());
        });
        writer.writeVector(this.stickers, (item) => {
            writer.write(item.getBytes());
        });
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): FavedStickers {
        const args: any = {};
        const _hash = reader.readLargeInt(64);
        args.hash = _hash;
        const _packs = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.packs = _packs;
        const _stickers = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.stickers = _stickers;
        return new FavedStickers(args);
    }
}