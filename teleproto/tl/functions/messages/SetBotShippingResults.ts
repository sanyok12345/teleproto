import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeShippingOption } from "../../types/TypeShippingOption";

export class SetBotShippingResults extends MTProtoRequest {
    static CONSTRUCTOR_ID = 3858133754;
    static SUBCLASS_OF_ID = 4122188204;
    static className = "messages.SetBotShippingResults";
    static classType = "request";

    flags?: number;
    queryId?: bigint;
    error?: string;
    shippingOptions?: TypeShippingOption[];

    constructor(args: { flags?: number, queryId?: bigint, error?: string, shippingOptions?: TypeShippingOption[] } = {}) {
        super();
        this.flags = args.flags;
        this.queryId = args.queryId;
        this.error = args.error;
        this.shippingOptions = args.shippingOptions;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3858133754, false);
        let flags = 0;
        if (this.error !== undefined && this.error !== null) { flags |= 1 << 0; }
        if (this.shippingOptions !== undefined && this.shippingOptions !== null) { flags |= 1 << 1; }
        writer.writeInt(flags, false);
        writer.writeLargeInt(this.queryId!, 64);
        if (this.error !== undefined && this.error !== null) {
            writer.tgWriteString(this.error);
        }
        if (this.shippingOptions !== undefined && this.shippingOptions !== null) {
            writer.writeVector(this.shippingOptions, (item) => {
                writer.write(item.getBytes());
            });
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

    static fromReader(reader: BinaryReader): SetBotShippingResults {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        const _queryId = reader.readLargeInt(64);
        args.queryId = _queryId;
        if (args.flags & (1 << 0)) {
            const _error = reader.tgReadString();
            args.error = _error;
        } else {
            args.error = undefined;
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
        return new SetBotShippingResults(args);
    }
}