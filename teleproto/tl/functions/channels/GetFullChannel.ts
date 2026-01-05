import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { TypeChatFull } from "../../types/messages/TypeChatFull";

export class GetFullChannel extends MTProtoRequest {
    static CONSTRUCTOR_ID = 141781513;
    static SUBCLASS_OF_ID = 576344329;
    static className = "channels.GetFullChannel";
    static classType = "request";

    channel?: EntityLike;

    constructor(args: { channel?: EntityLike } = {}) {
        super();
        this.channel = args.channel;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(141781513, false);
        writer.write((this.channel! as any).getBytes());
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeChatFull {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetFullChannel {
        const args: any = {};
        const _channel = reader.tgReadObject();
        args.channel = _channel;
        return new GetFullChannel(args);
    }
}