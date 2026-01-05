import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";

export class ReorderAlbums extends MTProtoRequest {
    static CONSTRUCTOR_ID = 2234907609;
    static SUBCLASS_OF_ID = 4122188204;
    static className = "stories.ReorderAlbums";
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
        writer.writeInt(2234907609, false);
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

    static fromReader(reader: BinaryReader): ReorderAlbums {
        const args: any = {};
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        const _order = reader.readVector((reader) => {
            const item = reader.readInt();
            return item;
        });
        args.order = _order;
        return new ReorderAlbums(args);
    }
}