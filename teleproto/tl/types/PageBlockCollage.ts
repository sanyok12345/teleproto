import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypePageBlock } from "./TypePageBlock";
import { TypePageCaption } from "./TypePageCaption";

export class PageBlockCollage extends TLObject {
    static CONSTRUCTOR_ID = 1705048653;
    static SUBCLASS_OF_ID = 449467972;
    static className = "PageBlockCollage";
    static classType = "constructor";

    items!: TypePageBlock[];
    caption!: TypePageCaption;

    constructor(args: { items?: TypePageBlock[], caption?: TypePageCaption } = {}) {
        super();
        this.items = args.items!;
        this.caption = args.caption!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1705048653, false);
        writer.writeVector(this.items, (item) => {
            writer.write(item.getBytes());
        });
        writer.write(this.caption.getBytes());
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): PageBlockCollage {
        const args: any = {};
        const _items = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.items = _items;
        const _caption = reader.tgReadObject();
        args.caption = _caption;
        return new PageBlockCollage(args);
    }
}