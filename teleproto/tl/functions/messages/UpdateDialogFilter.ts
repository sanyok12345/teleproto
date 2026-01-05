import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeDialogFilter } from "../../types/TypeDialogFilter";

export class UpdateDialogFilter extends MTProtoRequest {
    static CONSTRUCTOR_ID = 450142282;
    static SUBCLASS_OF_ID = 4122188204;
    static className = "messages.UpdateDialogFilter";
    static classType = "request";

    flags?: number;
    id?: number;
    filter?: TypeDialogFilter;

    constructor(args: { flags?: number, id?: number, filter?: TypeDialogFilter } = {}) {
        super();
        this.flags = args.flags;
        this.id = args.id;
        this.filter = args.filter;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(450142282, false);
        let flags = 0;
        if (this.filter !== undefined && this.filter !== null) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        writer.writeInt(this.id!);
        if (this.filter !== undefined && this.filter !== null) {
            writer.write(this.filter.getBytes());
        }
        return writer.getValue();
    }

    readResult(reader: BinaryReader): boolean {
        const result = reader.tgReadBool();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
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