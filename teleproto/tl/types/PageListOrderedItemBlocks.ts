import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypePageBlock } from "./TypePageBlock";

export class PageListOrderedItemBlocks extends TLObject {
    static CONSTRUCTOR_ID = 2564655414;
    static SUBCLASS_OF_ID = 4007268024;
    static className = "PageListOrderedItemBlocks";
    static classType = "constructor";

    num!: string;
    blocks!: TypePageBlock[];

    constructor(args: { num?: string, blocks?: TypePageBlock[] } = {}) {
        super();
        this.num = args.num!;
        this.blocks = args.blocks!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2564655414, false);
        writer.tgWriteString(this.num);
        writer.writeVector(this.blocks, (item) => {
            writer.write(item.getBytes());
        });
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): PageListOrderedItemBlocks {
        const args: any = {};
        const _num = reader.tgReadString();
        args.num = _num;
        const _blocks = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.blocks = _blocks;
        return new PageListOrderedItemBlocks(args);
    }
}