import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { MessageIDLike } from "../../types/../../define";
import { TypePublicForwards } from "../../types/stats/TypePublicForwards";

export class GetMessagePublicForwards extends MTProtoRequest {
    static CONSTRUCTOR_ID = 1595212100;
    static SUBCLASS_OF_ID = 2804429329;
    static className = "stats.GetMessagePublicForwards";
    static classType = "request";

    channel?: EntityLike;
    msgId?: MessageIDLike;
    offset!: string;
    limit!: number;

    constructor(args: { channel?: EntityLike, msgId?: MessageIDLike, offset?: string, limit?: number } = {}) {
        super();
        this.channel = args.channel;
        this.msgId = args.msgId;
        this.offset = args.offset!;
        this.limit = args.limit!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1595212100, false);
        writer.write((this.channel! as any).getBytes());
        if (typeof this.msgId! === 'number') {
            writer.writeInt(this.msgId!);
        } else {
            writer.writeInt((this.msgId! as any).id);
        }
        writer.tgWriteString(this.offset);
        writer.writeInt(this.limit);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypePublicForwards {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetMessagePublicForwards {
        const args: any = {};
        const _channel = reader.tgReadObject();
        args.channel = _channel;
        const _msgId = reader.tgReadObject();
        args.msgId = _msgId;
        const _offset = reader.tgReadString();
        args.offset = _offset;
        const _limit = reader.readInt();
        args.limit = _limit;
        return new GetMessagePublicForwards(args);
    }
}