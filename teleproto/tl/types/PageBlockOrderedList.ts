import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypePageListOrderedItem } from "./TypePageListOrderedItem";

export class PageBlockOrderedList extends TLObject {
    static CONSTRUCTOR_ID = 2592793057;
    static SUBCLASS_OF_ID = 449467972;
    static className = "PageBlockOrderedList";
    static classType = "constructor";

    items!: TypePageListOrderedItem[];

    constructor(args: { items?: TypePageListOrderedItem[] } = {}) {
        super();
        this.items = args.items!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2592793057, false);
        writer.writeVector(this.items, (item) => {
            writer.write(item.getBytes());
        });
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): PageBlockOrderedList {
        const args: any = {};
        const _items = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.items = _items;
        return new PageBlockOrderedList(args);
    }
}