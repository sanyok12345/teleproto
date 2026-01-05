import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeDialogFilter } from "./TypeDialogFilter";

export class DialogFilterSuggested extends TLObject {
    static CONSTRUCTOR_ID = 2004110666;
    static SUBCLASS_OF_ID = 837673094;
    static className = "DialogFilterSuggested";
    static classType = "constructor";

    filter!: TypeDialogFilter;
    description!: string;

    constructor(args: { filter?: TypeDialogFilter, description?: string } = {}) {
        super();
        this.filter = args.filter!;
        this.description = args.description!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2004110666, false);
        writer.write(this.filter.getBytes());
        writer.tgWriteString(this.description);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): DialogFilterSuggested {
        const args: any = {};
        const _filter = reader.tgReadObject();
        args.filter = _filter;
        const _description = reader.tgReadString();
        args.description = _description;
        return new DialogFilterSuggested(args);
    }
}