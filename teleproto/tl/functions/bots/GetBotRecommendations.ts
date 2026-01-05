import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { TypeUsers } from "../../types/users/TypeUsers";

export class GetBotRecommendations extends MTProtoRequest {
    static CONSTRUCTOR_ID = 2713126933;
    static SUBCLASS_OF_ID = 4065063104;
    static className = "bots.GetBotRecommendations";
    static classType = "request";

    bot?: EntityLike;

    constructor(args: { bot?: EntityLike } = {}) {
        super();
        this.bot = args.bot;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2713126933, false);
        writer.write((this.bot! as any).getBytes());
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeUsers {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetBotRecommendations {
        const args: any = {};
        const _bot = reader.tgReadObject();
        args.bot = _bot;
        return new GetBotRecommendations(args);
    }
}