import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";

export class ReadStories extends MTProtoRequest {
    static CONSTRUCTOR_ID = 2773932744;
    static SUBCLASS_OF_ID = 1344696591;
    static className = "stories.ReadStories";
    static classType = "request";

    peer?: EntityLike;
    maxId?: number;

    constructor(args: { peer?: EntityLike, maxId?: number } = {}) {
        super();
        this.peer = args.peer;
        this.maxId = args.maxId;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2773932744, false);
        writer.write((this.peer! as any).getBytes());
        writer.writeInt(this.maxId!);
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

    static fromReader(reader: BinaryReader): ReadStories {
        const args: any = {};
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        const _maxId = reader.readInt();
        args.maxId = _maxId;
        return new ReadStories(args);
    }
}