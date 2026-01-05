import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeInputBotInlineMessageID } from "../../types/TypeInputBotInlineMessageID";
import { EntityLike } from "../../types/../../define";
import { TypeHighScores } from "../../types/messages/TypeHighScores";

export class GetInlineGameHighScores extends MTProtoRequest {
    static CONSTRUCTOR_ID = 258170395;
    static SUBCLASS_OF_ID = 1825412605;
    static className = "messages.GetInlineGameHighScores";
    static classType = "request";

    id?: TypeInputBotInlineMessageID;
    userId!: EntityLike;

    constructor(args: { id?: TypeInputBotInlineMessageID, userId?: EntityLike } = {}) {
        super();
        this.id = args.id;
        this.userId = args.userId!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(258170395, false);
        writer.write(this.id!.getBytes());
        writer.write((this.userId as any).getBytes());
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeHighScores {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetInlineGameHighScores {
        const args: any = {};
        const _id = reader.tgReadObject();
        args.id = _id;
        const _userId = reader.tgReadObject();
        args.userId = _userId;
        return new GetInlineGameHighScores(args);
    }
}