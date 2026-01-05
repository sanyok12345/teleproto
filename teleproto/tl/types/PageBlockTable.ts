import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeRichText } from "./TypeRichText";
import { TypePageTableRow } from "./TypePageTableRow";

export class PageBlockTable extends TLObject {
    static CONSTRUCTOR_ID = 3209554562;
    static SUBCLASS_OF_ID = 449467972;
    static className = "PageBlockTable";
    static classType = "constructor";

    flags!: number;
    bordered?: boolean;
    striped?: boolean;
    title!: TypeRichText;
    rows!: TypePageTableRow[];

    constructor(args: { flags?: number, bordered?: boolean, striped?: boolean, title?: TypeRichText, rows?: TypePageTableRow[] } = {}) {
        super();
        this.flags = args.flags!;
        this.bordered = args.bordered;
        this.striped = args.striped;
        this.title = args.title!;
        this.rows = args.rows!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3209554562, false);
        let flags = 0;
        if (this.bordered) { flags |= 1 << 0; }
        if (this.striped) { flags |= 1 << 1; }
        writer.writeInt(flags, false);
        if (this.bordered !== undefined && this.bordered !== null) {
        }
        if (this.striped !== undefined && this.striped !== null) {
        }
        writer.write(this.title.getBytes());
        writer.writeVector(this.rows, (item) => {
            writer.write(item.getBytes());
        });
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): PageBlockTable {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _bordered = true;
            args.bordered = _bordered;
        } else {
            args.bordered = false;
        }
        if (args.flags & (1 << 1)) {
            const _striped = true;
            args.striped = _striped;
        } else {
            args.striped = false;
        }
        const _title = reader.tgReadObject();
        args.title = _title;
        const _rows = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.rows = _rows;
        return new PageBlockTable(args);
    }
}