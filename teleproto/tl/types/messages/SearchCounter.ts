import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";
import { TypeMessagesFilter } from "../TypeMessagesFilter";

export class SearchCounter extends TLObject {
    static CONSTRUCTOR_ID = 3896830975;
    static SUBCLASS_OF_ID = 3601317794;
    static className = "messages.SearchCounter";
    static classType = "constructor";

    flags!: number;
    inexact?: boolean;
    filter!: TypeMessagesFilter;
    count!: number;

    constructor(args: { flags?: number, inexact?: boolean, filter?: TypeMessagesFilter, count?: number } = {}) {
        super();
        this.flags = args.flags!;
        this.inexact = args.inexact;
        this.filter = args.filter!;
        this.count = args.count!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3896830975, false);
        let flags = 0;
        if (this.inexact) { flags |= 1 << 1; }
        writer.writeInt(flags, false);
        if (this.inexact !== undefined && this.inexact !== null) {
        }
        writer.write(this.filter.getBytes());
        writer.writeInt(this.count);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): SearchCounter {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 1)) {
            const _inexact = true;
            args.inexact = _inexact;
        } else {
            args.inexact = false;
        }
        const _filter = reader.tgReadObject();
        args.filter = _filter;
        const _count = reader.readInt();
        args.count = _count;
        return new SearchCounter(args);
    }
}