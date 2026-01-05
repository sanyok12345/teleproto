import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";
import { TypeStickerPack } from "../TypeStickerPack";
import { TypeDocument } from "../TypeDocument";

export class RecentStickers extends TLObject {
    static CONSTRUCTOR_ID = 2295561302;
    static SUBCLASS_OF_ID = 4151281283;
    static className = "messages.RecentStickers";
    static classType = "constructor";

    hash!: bigint;
    packs!: TypeStickerPack[];
    stickers!: TypeDocument[];
    dates!: number[];

    constructor(args: { hash?: bigint, packs?: TypeStickerPack[], stickers?: TypeDocument[], dates?: number[] } = {}) {
        super();
        this.hash = args.hash!;
        this.packs = args.packs!;
        this.stickers = args.stickers!;
        this.dates = args.dates!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2295561302, false);
        writer.writeLargeInt(this.hash, 64);
        writer.writeVector(this.packs, (item) => {
            writer.write(item.getBytes());
        });
        writer.writeVector(this.stickers, (item) => {
            writer.write(item.getBytes());
        });
        writer.writeVector(this.dates, (item) => {
            writer.writeInt(item);
        });
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): RecentStickers {
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
        const _dates = reader.readVector((reader) => {
            const item = reader.readInt();
            return item;
        });
        args.dates = _dates;
        return new RecentStickers(args);
    }
}