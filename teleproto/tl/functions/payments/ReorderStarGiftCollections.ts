import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";

export class ReorderStarGiftCollections extends MTProtoRequest {
    static CONSTRUCTOR_ID = 3274372300;
    static SUBCLASS_OF_ID = 4122188204;
    static className = "payments.ReorderStarGiftCollections";
    static classType = "request";

    peer?: EntityLike;
    order!: number[];

    constructor(args: { peer?: EntityLike, order?: number[] } = {}) {
        super();
        this.peer = args.peer;
        this.order = args.order!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3274372300, false);
        writer.write((this.peer! as any).getBytes());
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

    static fromReader(reader: BinaryReader): ReorderStarGiftCollections {
        const args: any = {};
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        const _order = reader.readVector((reader) => {
            const item = reader.readInt();
            return item;
        });
        args.order = _order;
        return new ReorderStarGiftCollections(args);
    }
}