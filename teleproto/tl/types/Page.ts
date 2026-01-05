import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypePageBlock } from "./TypePageBlock";
import { TypePhoto } from "./TypePhoto";
import { TypeDocument } from "./TypeDocument";

export class Page extends TLObject {
    static CONSTRUCTOR_ID = 2556788493;
    static SUBCLASS_OF_ID = 3023575326;
    static className = "Page";
    static classType = "constructor";

    flags!: number;
    part?: boolean;
    rtl?: boolean;
    v2?: boolean;
    url!: string;
    blocks!: TypePageBlock[];
    photos!: TypePhoto[];
    documents!: TypeDocument[];
    views?: number;

    constructor(args: { flags?: number, part?: boolean, rtl?: boolean, v2?: boolean, url?: string, blocks?: TypePageBlock[], photos?: TypePhoto[], documents?: TypeDocument[], views?: number } = {}) {
        super();
        this.flags = args.flags!;
        this.part = args.part;
        this.rtl = args.rtl;
        this.v2 = args.v2;
        this.url = args.url!;
        this.blocks = args.blocks!;
        this.photos = args.photos!;
        this.documents = args.documents!;
        this.views = args.views;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2556788493, false);
        let flags = 0;
        if (this.part) { flags |= 1 << 0; }
        if (this.rtl) { flags |= 1 << 1; }
        if (this.v2) { flags |= 1 << 2; }
        if (this.views !== undefined && this.views !== null) { flags |= 1 << 3; }
        writer.writeInt(flags, false);
        if (this.part !== undefined && this.part !== null) {
        }
        if (this.rtl !== undefined && this.rtl !== null) {
        }
        if (this.v2 !== undefined && this.v2 !== null) {
        }
        writer.tgWriteString(this.url);
        writer.writeVector(this.blocks, (item) => {
            writer.write(item.getBytes());
        });
        writer.writeVector(this.photos, (item) => {
            writer.write(item.getBytes());
        });
        writer.writeVector(this.documents, (item) => {
            writer.write(item.getBytes());
        });
        if (this.views !== undefined && this.views !== null) {
            writer.writeInt(this.views);
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): Page {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _part = true;
            args.part = _part;
        } else {
            args.part = false;
        }
        if (args.flags & (1 << 1)) {
            const _rtl = true;
            args.rtl = _rtl;
        } else {
            args.rtl = false;
        }
        if (args.flags & (1 << 2)) {
            const _v2 = true;
            args.v2 = _v2;
        } else {
            args.v2 = false;
        }
        const _url = reader.tgReadString();
        args.url = _url;
        const _blocks = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.blocks = _blocks;
        const _photos = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.photos = _photos;
        const _documents = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.documents = _documents;
        if (args.flags & (1 << 3)) {
            const _views = reader.readInt();
            args.views = _views;
        } else {
            args.views = undefined;
        }
        return new Page(args);
    }
}