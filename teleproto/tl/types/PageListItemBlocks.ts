import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypePageBlock } from "./TypePageBlock";

export class PageListItemBlocks extends TLObject {
    static CONSTRUCTOR_ID = 635466748;
    static SUBCLASS_OF_ID = 2360261809;
    static className = "PageListItemBlocks";
    static classType = "constructor";

    blocks!: TypePageBlock[];

    constructor(args: { blocks?: TypePageBlock[] } = {}) {
        super();
        this.blocks = args.blocks!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(635466748, false);
        writer.writeVector(this.blocks, (item) => {
            writer.write(item.getBytes());
        });
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): PageListItemBlocks {
        const args: any = {};
        const _blocks = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.blocks = _blocks;
        return new PageListItemBlocks(args);
    }
}