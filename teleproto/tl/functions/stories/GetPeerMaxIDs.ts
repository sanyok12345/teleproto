import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { TypeRecentStory } from "../../types/TypeRecentStory";

export class GetPeerMaxIDs extends MTProtoRequest {
    static CONSTRUCTOR_ID = 2018087280;
    static SUBCLASS_OF_ID = 1018597718;
    static className = "stories.GetPeerMaxIDs";
    static classType = "request";

    id?: EntityLike[];

    constructor(args: { id?: EntityLike[] } = {}) {
        super();
        this.id = args.id;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2018087280, false);
        writer.writeVector(this.id!, (item) => {
            writer.write((item as any).getBytes());
        });
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeRecentStory[] {
        const result = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetPeerMaxIDs {
        const args: any = {};
        const _id = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.id = _id;
        return new GetPeerMaxIDs(args);
    }
}