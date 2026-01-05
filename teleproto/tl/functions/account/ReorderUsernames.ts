import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";

export class ReorderUsernames extends MTProtoRequest {
    static CONSTRUCTOR_ID = 4015001259;
    static SUBCLASS_OF_ID = 4122188204;
    static className = "account.ReorderUsernames";
    static classType = "request";

    order!: string[];

    constructor(args: { order?: string[] } = {}) {
        super();
        this.order = args.order!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(4015001259, false);
        writer.writeVector(this.order, (item) => {
            writer.tgWriteString(item);
        });
        return writer.getValue();
    }

    readResult(reader: BinaryReader): boolean {
        const result = reader.tgReadBool();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): ReorderUsernames {
        const args: any = {};
        const _order = reader.readVector((reader) => {
            const item = reader.tgReadString();
            return item;
        });
        args.order = _order;
        return new ReorderUsernames(args);
    }
}