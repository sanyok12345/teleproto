import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { TypeInputMessage } from "../../types/TypeInputMessage";
import { TypeMessages } from "../../types/messages/TypeMessages";

export class GetMessages extends MTProtoRequest {
    static CONSTRUCTOR_ID = 2911672867;
    static SUBCLASS_OF_ID = 3568569182;
    static className = "channels.GetMessages";
    static classType = "request";

    channel?: EntityLike;
    id?: TypeInputMessage[];

    constructor(args: { channel?: EntityLike, id?: TypeInputMessage[] } = {}) {
        super();
        this.channel = args.channel;
        this.id = args.id;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2911672867, false);
        writer.write((this.channel! as any).getBytes());
        writer.writeVector(this.id!, (item) => {
            writer.write(item.getBytes());
        });
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeMessages {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetMessages {
        const args: any = {};
        const _channel = reader.tgReadObject();
        args.channel = _channel;
        const _id = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.id = _id;
        return new GetMessages(args);
    }
}