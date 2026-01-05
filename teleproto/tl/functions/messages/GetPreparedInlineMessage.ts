import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { TypePreparedInlineMessage } from "../../types/messages/TypePreparedInlineMessage";

export class GetPreparedInlineMessage extends MTProtoRequest {
    static CONSTRUCTOR_ID = 2239675832;
    static SUBCLASS_OF_ID = 1225645901;
    static className = "messages.GetPreparedInlineMessage";
    static classType = "request";

    bot?: EntityLike;
    id?: string;

    constructor(args: { bot?: EntityLike, id?: string } = {}) {
        super();
        this.bot = args.bot;
        this.id = args.id;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2239675832, false);
        writer.write((this.bot! as any).getBytes());
        writer.tgWriteString(this.id!);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypePreparedInlineMessage {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetPreparedInlineMessage {
        const args: any = {};
        const _bot = reader.tgReadObject();
        args.bot = _bot;
        const _id = reader.tgReadString();
        args.id = _id;
        return new GetPreparedInlineMessage(args);
    }
}