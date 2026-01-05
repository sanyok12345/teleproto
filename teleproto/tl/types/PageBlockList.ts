import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypePageListItem } from "./TypePageListItem";

export class PageBlockList extends TLObject {
    static CONSTRUCTOR_ID = 3840442385;
    static SUBCLASS_OF_ID = 449467972;
    static className = "PageBlockList";
    static classType = "constructor";

    items!: TypePageListItem[];

    constructor(args: { items?: TypePageListItem[] } = {}) {
        super();
        this.items = args.items!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3840442385, false);
        writer.writeVector(this.items, (item) => {
            writer.write(item.getBytes());
        });
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): PageBlockList {
        const args: any = {};
        const _items = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.items = _items;
        return new PageBlockList(args);
    }
}