import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";
import { TypeShippingOption } from "../TypeShippingOption";

export class ValidatedRequestedInfo extends TLObject {
    static CONSTRUCTOR_ID = 3510966403;
    static SUBCLASS_OF_ID = 2407548087;
    static className = "payments.ValidatedRequestedInfo";
    static classType = "constructor";

    flags!: number;
    id?: string;
    shippingOptions?: TypeShippingOption[];

    constructor(args: { flags?: number, id?: string, shippingOptions?: TypeShippingOption[] } = {}) {
        super();
        this.flags = args.flags!;
        this.id = args.id;
        this.shippingOptions = args.shippingOptions;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3510966403, false);
        let flags = 0;
        if (this.id !== undefined && this.id !== null) { flags |= 1 << 0; }
        if (this.shippingOptions !== undefined && this.shippingOptions !== null) { flags |= 1 << 1; }
        writer.writeInt(flags, false);
        if (this.id !== undefined && this.id !== null) {
            writer.tgWriteString(this.id);
        }
        if (this.shippingOptions !== undefined && this.shippingOptions !== null) {
            writer.writeVector(this.shippingOptions, (item) => {
                writer.write(item.getBytes());
            });
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): ValidatedRequestedInfo {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _id = reader.tgReadString();
            args.id = _id;
        } else {
            args.id = undefined;
        }
        if (args.flags & (1 << 1)) {
            const _shippingOptions = reader.readVector((reader) => {
                const item = reader.tgReadObject();
                return item;
            });
            args.shippingOptions = _shippingOptions;
        } else {
            args.shippingOptions = undefined;
        }
        return new ValidatedRequestedInfo(args);
    }
}