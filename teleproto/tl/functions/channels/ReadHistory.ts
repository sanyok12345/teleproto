import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";

export class ReadHistory extends MTProtoRequest {
    static CONSTRUCTOR_ID = 3423619383;
    static SUBCLASS_OF_ID = 4122188204;
    static className = "channels.ReadHistory";
    static classType = "request";

    channel?: EntityLike;
    maxId?: number;

    constructor(args: { channel?: EntityLike, maxId?: number } = {}) {
        super();
        this.channel = args.channel;
        this.maxId = args.maxId;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3423619383, false);
        writer.write((this.channel! as any).getBytes());
        writer.writeInt(this.maxId!);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): boolean {
        const result = reader.tgReadBool();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): ReadHistory {
        const args: any = {};
        const _channel = reader.tgReadObject();
        args.channel = _channel;
        const _maxId = reader.readInt();
        args.maxId = _maxId;
        return new ReadHistory(args);
    }
}