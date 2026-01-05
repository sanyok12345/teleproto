import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { TypeChats } from "../../types/messages/TypeChats";

export class GetChannelRecommendations extends MTProtoRequest {
    static CONSTRUCTOR_ID = 631707458;
    static SUBCLASS_OF_ID = 2580925204;
    static className = "channels.GetChannelRecommendations";
    static classType = "request";

    flags?: number;
    channel?: EntityLike;

    constructor(args: { flags?: number, channel?: EntityLike } = {}) {
        super();
        this.flags = args.flags;
        this.channel = args.channel;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(631707458, false);
        let flags = 0;
        if (this.channel !== undefined && this.channel !== null) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        if (this.channel !== undefined && this.channel !== null) {
            writer.write((this.channel as any).getBytes());
        }
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeChats {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetChannelRecommendations {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _channel = reader.tgReadObject();
            args.channel = _channel;
        } else {
            args.channel = undefined;
        }
        return new GetChannelRecommendations(args);
    }
}