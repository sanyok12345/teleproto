import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";

export class ReorderUsernames extends MTProtoRequest {
    static CONSTRUCTOR_ID = 3025988893;
    static SUBCLASS_OF_ID = 4122188204;
    static className = "channels.ReorderUsernames";
    static classType = "request";

    channel?: EntityLike;
    order!: string[];

    constructor(args: { channel?: EntityLike, order?: string[] } = {}) {
        super();
        this.channel = args.channel;
        this.order = args.order!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3025988893, false);
        writer.write((this.channel! as any).getBytes());
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
        const _channel = reader.tgReadObject();
        args.channel = _channel;
        const _order = reader.readVector((reader) => {
            const item = reader.tgReadString();
            return item;
        });
        args.order = _order;
        return new ReorderUsernames(args);
    }
}