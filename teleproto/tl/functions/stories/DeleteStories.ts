import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";

export class DeleteStories extends MTProtoRequest {
    static CONSTRUCTOR_ID = 2925124447;
    static SUBCLASS_OF_ID = 1344696591;
    static className = "stories.DeleteStories";
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
        writer.writeInt(2925124447, false);
        writer.write((this.peer! as any).getBytes());
        writer.writeVector(this.id!, (item) => {
            writer.writeInt(item);
        });
        return writer.getValue();
    }

    readResult(reader: BinaryReader): number[] {
        const result = reader.readVector((reader) => {
            const item = reader.readInt();
            return item;
        });
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): DeleteStories {
        const args: any = {};
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        const _id = reader.readVector((reader) => {
            const item = reader.readInt();
            return item;
        });
        args.id = _id;
        return new DeleteStories(args);
    }
}