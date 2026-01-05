import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypePageTableCell } from "./TypePageTableCell";

export class PageTableRow extends TLObject {
    static CONSTRUCTOR_ID = 3770729957;
    static SUBCLASS_OF_ID = 1504505361;
    static className = "PageTableRow";
    static classType = "constructor";

    cells!: TypePageTableCell[];

    constructor(args: { cells?: TypePageTableCell[] } = {}) {
        super();
        this.cells = args.cells!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3770729957, false);
        writer.writeVector(this.cells, (item) => {
            writer.write(item.getBytes());
        });
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): PageTableRow {
        const args: any = {};
        const _cells = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.cells = _cells;
        return new PageTableRow(args);
    }
}