import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";

export class IncrementStoryViews extends MTProtoRequest {
    static CONSTRUCTOR_ID = 2986511099;
    static SUBCLASS_OF_ID = 4122188204;
    static className = "stories.IncrementStoryViews";
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
        writer.writeInt(2986511099, false);
        writer.write((this.peer! as any).getBytes());
        writer.writeVector(this.id!, (item) => {
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

    static fromReader(reader: BinaryReader): IncrementStoryViews {
        const args: any = {};
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        const _id = reader.readVector((reader) => {
            const item = reader.readInt();
            return item;
        });
        args.id = _id;
        return new IncrementStoryViews(args);
    }
}