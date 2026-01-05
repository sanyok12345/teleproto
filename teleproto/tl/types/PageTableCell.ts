import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeRichText } from "./TypeRichText";

export class PageTableCell extends TLObject {
    static CONSTRUCTOR_ID = 878078826;
    static SUBCLASS_OF_ID = 2968203348;
    static className = "PageTableCell";
    static classType = "constructor";

    flags!: number;
    header?: boolean;
    alignCenter?: boolean;
    alignRight?: boolean;
    valignMiddle?: boolean;
    valignBottom?: boolean;
    text?: TypeRichText;
    colspan?: number;
    rowspan?: number;

    constructor(args: { flags?: number, header?: boolean, alignCenter?: boolean, alignRight?: boolean, valignMiddle?: boolean, valignBottom?: boolean, text?: TypeRichText, colspan?: number, rowspan?: number } = {}) {
        super();
        this.flags = args.flags!;
        this.header = args.header;
        this.alignCenter = args.alignCenter;
        this.alignRight = args.alignRight;
        this.valignMiddle = args.valignMiddle;
        this.valignBottom = args.valignBottom;
        this.text = args.text;
        this.colspan = args.colspan;
        this.rowspan = args.rowspan;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(878078826, false);
        let flags = 0;
        if (this.header) { flags |= 1 << 0; }
        if (this.alignCenter) { flags |= 1 << 3; }
        if (this.alignRight) { flags |= 1 << 4; }
        if (this.valignMiddle) { flags |= 1 << 5; }
        if (this.valignBottom) { flags |= 1 << 6; }
        if (this.text !== undefined && this.text !== null) { flags |= 1 << 7; }
        if (this.colspan !== undefined && this.colspan !== null) { flags |= 1 << 1; }
        if (this.rowspan !== undefined && this.rowspan !== null) { flags |= 1 << 2; }
        writer.writeInt(flags, false);
        if (this.header !== undefined && this.header !== null) {
        }
        if (this.alignCenter !== undefined && this.alignCenter !== null) {
        }
        if (this.alignRight !== undefined && this.alignRight !== null) {
        }
        if (this.valignMiddle !== undefined && this.valignMiddle !== null) {
        }
        if (this.valignBottom !== undefined && this.valignBottom !== null) {
        }
        if (this.text !== undefined && this.text !== null) {
            writer.write(this.text.getBytes());
        }
        if (this.colspan !== undefined && this.colspan !== null) {
            writer.writeInt(this.colspan);
        }
        if (this.rowspan !== undefined && this.rowspan !== null) {
            writer.writeInt(this.rowspan);
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): PageTableCell {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _header = true;
            args.header = _header;
        } else {
            args.header = false;
        }
        if (args.flags & (1 << 3)) {
            const _alignCenter = true;
            args.alignCenter = _alignCenter;
        } else {
            args.alignCenter = false;
        }
        if (args.flags & (1 << 4)) {
            const _alignRight = true;
            args.alignRight = _alignRight;
        } else {
            args.alignRight = false;
        }
        if (args.flags & (1 << 5)) {
            const _valignMiddle = true;
            args.valignMiddle = _valignMiddle;
        } else {
            args.valignMiddle = false;
        }
        if (args.flags & (1 << 6)) {
            const _valignBottom = true;
            args.valignBottom = _valignBottom;
        } else {
            args.valignBottom = false;
        }
        if (args.flags & (1 << 7)) {
            const _text = reader.tgReadObject();
            args.text = _text;
        } else {
            args.text = undefined;
        }
        if (args.flags & (1 << 1)) {
            const _colspan = reader.readInt();
            args.colspan = _colspan;
        } else {
            args.colspan = undefined;
        }
        if (args.flags & (1 << 2)) {
            const _rowspan = reader.readInt();
            args.rowspan = _rowspan;
        } else {
            args.rowspan = undefined;
        }
        return new PageTableCell(args);
    }
}