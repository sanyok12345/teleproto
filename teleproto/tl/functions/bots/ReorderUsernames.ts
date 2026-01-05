import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";

export class ReorderUsernames extends MTProtoRequest {
    static CONSTRUCTOR_ID = 2533994946;
    static SUBCLASS_OF_ID = 4122188204;
    static className = "bots.ReorderUsernames";
    static classType = "request";

    bot?: EntityLike;
    order!: string[];

    constructor(args: { bot?: EntityLike, order?: string[] } = {}) {
        super();
        this.bot = args.bot;
        this.order = args.order!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2533994946, false);
        writer.write((this.bot! as any).getBytes());
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
        const _bot = reader.tgReadObject();
        args.bot = _bot;
        const _order = reader.readVector((reader) => {
            const item = reader.tgReadString();
            return item;
        });
        args.order = _order;
        return new ReorderUsernames(args);
    }
}