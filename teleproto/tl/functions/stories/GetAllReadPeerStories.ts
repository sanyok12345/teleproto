import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeUpdates } from "../../types/TypeUpdates";

export class GetAllReadPeerStories extends MTProtoRequest {
    static CONSTRUCTOR_ID = 2606426105;
    static SUBCLASS_OF_ID = 2331323052;
    static className = "stories.GetAllReadPeerStories";
    static classType = "request";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2606426105, false);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeUpdates {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetAllReadPeerStories {
        const args: any = {};
        return new GetAllReadPeerStories(args);
    }
}