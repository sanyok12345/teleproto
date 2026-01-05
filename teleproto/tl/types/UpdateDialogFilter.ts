import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeDialogFilter } from "./TypeDialogFilter";

export class UpdateDialogFilter extends TLObject {
    static CONSTRUCTOR_ID = 654302845;
    static SUBCLASS_OF_ID = 2676568142;
    static className = "UpdateDialogFilter";
    static classType = "constructor";

    flags!: number;
    id!: number;
    filter?: TypeDialogFilter;

    constructor(args: { flags?: number, id?: number, filter?: TypeDialogFilter } = {}) {
        super();
        this.flags = args.flags!;
        this.id = args.id!;
        this.filter = args.filter;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(654302845, false);
        let flags = 0;
        if (this.filter !== undefined && this.filter !== null) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        writer.writeInt(this.id);
        if (this.filter !== undefined && this.filter !== null) {
            writer.write(this.filter.getBytes());
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): UpdateDialogFilter {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        const _id = reader.readInt();
        args.id = _id;
        if (args.flags & (1 << 0)) {
            const _filter = reader.tgReadObject();
            args.filter = _filter;
        } else {
            args.filter = undefined;
        }
        return new UpdateDialogFilter(args);
    }
}