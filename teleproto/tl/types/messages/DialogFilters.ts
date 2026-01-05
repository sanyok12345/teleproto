import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";
import { TypeDialogFilter } from "../TypeDialogFilter";

export class DialogFilters extends TLObject {
    static CONSTRUCTOR_ID = 718878489;
    static SUBCLASS_OF_ID = 2785014199;
    static className = "messages.DialogFilters";
    static classType = "constructor";

    flags!: number;
    tagsEnabled?: boolean;
    filters!: TypeDialogFilter[];

    constructor(args: { flags?: number, tagsEnabled?: boolean, filters?: TypeDialogFilter[] } = {}) {
        super();
        this.flags = args.flags!;
        this.tagsEnabled = args.tagsEnabled;
        this.filters = args.filters!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(718878489, false);
        let flags = 0;
        if (this.tagsEnabled) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        if (this.tagsEnabled !== undefined && this.tagsEnabled !== null) {
        }
        writer.writeVector(this.filters, (item) => {
            writer.write(item.getBytes());
        });
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): DialogFilters {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _tagsEnabled = true;
            args.tagsEnabled = _tagsEnabled;
        } else {
            args.tagsEnabled = false;
        }
        const _filters = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.filters = _filters;
        return new DialogFilters(args);
    }
}