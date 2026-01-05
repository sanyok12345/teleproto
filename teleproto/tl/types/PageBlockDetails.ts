import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypePageBlock } from "./TypePageBlock";
import { TypeRichText } from "./TypeRichText";

export class PageBlockDetails extends TLObject {
    static CONSTRUCTOR_ID = 1987480557;
    static SUBCLASS_OF_ID = 449467972;
    static className = "PageBlockDetails";
    static classType = "constructor";

    flags!: number;
    open?: boolean;
    blocks!: TypePageBlock[];
    title!: TypeRichText;

    constructor(args: { flags?: number, open?: boolean, blocks?: TypePageBlock[], title?: TypeRichText } = {}) {
        super();
        this.flags = args.flags!;
        this.open = args.open;
        this.blocks = args.blocks!;
        this.title = args.title!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1987480557, false);
        let flags = 0;
        if (this.open) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        if (this.open !== undefined && this.open !== null) {
        }
        writer.writeVector(this.blocks, (item) => {
            writer.write(item.getBytes());
        });
        writer.write(this.title.getBytes());
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): PageBlockDetails {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _open = true;
            args.open = _open;
        } else {
            args.open = false;
        }
        const _blocks = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.blocks = _blocks;
        const _title = reader.tgReadObject();
        args.title = _title;
        return new PageBlockDetails(args);
    }
}