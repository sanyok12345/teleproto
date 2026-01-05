import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { TypeAttachMenuBotsBot } from "../../types/TypeAttachMenuBotsBot";

export class GetAttachMenuBot extends MTProtoRequest {
    static CONSTRUCTOR_ID = 1998676370;
    static SUBCLASS_OF_ID = 3677587517;
    static className = "messages.GetAttachMenuBot";
    static classType = "request";

    bot?: EntityLike;

    constructor(args: { bot?: EntityLike } = {}) {
        super();
        this.bot = args.bot;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1998676370, false);
        writer.write((this.bot! as any).getBytes());
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeAttachMenuBotsBot {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetAttachMenuBot {
        const args: any = {};
        const _bot = reader.tgReadObject();
        args.bot = _bot;
        return new GetAttachMenuBot(args);
    }
}