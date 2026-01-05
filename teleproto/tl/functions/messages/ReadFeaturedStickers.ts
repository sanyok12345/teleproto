import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";

export class ReadFeaturedStickers extends MTProtoRequest {
    static CONSTRUCTOR_ID = 1527873830;
    static SUBCLASS_OF_ID = 4122188204;
    static className = "messages.ReadFeaturedStickers";
    static classType = "request";

    id?: bigint[];

    constructor(args: { id?: bigint[] } = {}) {
        super();
        this.id = args.id;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1527873830, false);
        writer.writeVector(this.id!, (item) => {
            writer.writeLargeInt(item, 64);
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

    static fromReader(reader: BinaryReader): ReadFeaturedStickers {
        const args: any = {};
        const _id = reader.readVector((reader) => {
            const item = reader.readLargeInt(64);
            return item;
        });
        args.id = _id;
        return new ReadFeaturedStickers(args);
    }
}