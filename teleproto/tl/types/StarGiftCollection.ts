import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeDocument } from "./TypeDocument";

export class StarGiftCollection extends TLObject {
    static CONSTRUCTOR_ID = 2641040304;
    static SUBCLASS_OF_ID = 1138805578;
    static className = "StarGiftCollection";
    static classType = "constructor";

    flags!: number;
    collectionId!: number;
    title!: string;
    icon?: TypeDocument;
    giftsCount!: number;
    hash!: bigint;

    constructor(args: { flags?: number, collectionId?: number, title?: string, icon?: TypeDocument, giftsCount?: number, hash?: bigint } = {}) {
        super();
        this.flags = args.flags!;
        this.collectionId = args.collectionId!;
        this.title = args.title!;
        this.icon = args.icon;
        this.giftsCount = args.giftsCount!;
        this.hash = args.hash!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2641040304, false);
        let flags = 0;
        if (this.icon !== undefined && this.icon !== null) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        writer.writeInt(this.collectionId);
        writer.tgWriteString(this.title);
        if (this.icon !== undefined && this.icon !== null) {
            writer.write(this.icon.getBytes());
        }
        writer.writeInt(this.giftsCount);
        writer.writeLargeInt(this.hash, 64);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): StarGiftCollection {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        const _collectionId = reader.readInt();
        args.collectionId = _collectionId;
        const _title = reader.tgReadString();
        args.title = _title;
        if (args.flags & (1 << 0)) {
            const _icon = reader.tgReadObject();
            args.icon = _icon;
        } else {
            args.icon = undefined;
        }
        const _giftsCount = reader.readInt();
        args.giftsCount = _giftsCount;
        const _hash = reader.readLargeInt(64);
        args.hash = _hash;
        return new StarGiftCollection(args);
    }
}