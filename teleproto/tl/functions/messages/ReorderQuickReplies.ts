import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";

export class ReorderQuickReplies extends MTProtoRequest {
    static CONSTRUCTOR_ID = 1613961479;
    static SUBCLASS_OF_ID = 4122188204;
    static className = "messages.ReorderQuickReplies";
    static classType = "request";

    order!: number[];

    constructor(args: { order?: number[] } = {}) {
        super();
        this.order = args.order!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1613961479, false);
        writer.writeVector(this.order, (item) => {
            writer.writeInt(item);
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

    static fromReader(reader: BinaryReader): ReorderQuickReplies {
        const args: any = {};
        const _order = reader.readVector((reader) => {
            const item = reader.readInt();
            return item;
        });
        args.order = _order;
        return new ReorderQuickReplies(args);
    }
}