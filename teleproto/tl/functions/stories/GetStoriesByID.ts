import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { TypeStories } from "../../types/stories/TypeStories";

export class GetStoriesByID extends MTProtoRequest {
    static CONSTRUCTOR_ID = 1467271796;
    static SUBCLASS_OF_ID = 622595116;
    static className = "stories.GetStoriesByID";
    static classType = "request";

    peer?: EntityLike;
    id?: number[];

    constructor(args: { peer?: EntityLike, id?: number[] } = {}) {
        super();
        this.peer = args.peer;
        this.id = args.id;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1467271796, false);
        writer.write((this.peer! as any).getBytes());
        writer.writeVector(this.id!, (item) => {
            writer.writeInt(item);
        });
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeStories {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetStoriesByID {
        const args: any = {};
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        const _id = reader.readVector((reader) => {
            const item = reader.readInt();
            return item;
        });
        args.id = _id;
        return new GetStoriesByID(args);
    }
}