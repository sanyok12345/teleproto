import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { TypeCanSendStoryCount } from "../../types/stories/TypeCanSendStoryCount";

export class CanSendStory extends MTProtoRequest {
    static CONSTRUCTOR_ID = 820732912;
    static SUBCLASS_OF_ID = 3411255960;
    static className = "stories.CanSendStory";
    static classType = "request";

    peer?: EntityLike;

    constructor(args: { peer?: EntityLike } = {}) {
        super();
        this.peer = args.peer;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(820732912, false);
        writer.write((this.peer! as any).getBytes());
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeCanSendStoryCount {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): CanSendStory {
        const args: any = {};
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        return new CanSendStory(args);
    }
}