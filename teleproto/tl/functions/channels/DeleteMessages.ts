import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { TypeAffectedMessages } from "../../types/messages/TypeAffectedMessages";

export class DeleteMessages extends MTProtoRequest {
    static CONSTRUCTOR_ID = 2227305806;
    static SUBCLASS_OF_ID = 3469983854;
    static className = "channels.DeleteMessages";
    static classType = "request";

    channel?: EntityLike;
    id?: number[];

    constructor(args: { channel?: EntityLike, id?: number[] } = {}) {
        super();
        this.channel = args.channel;
        this.id = args.id;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2227305806, false);
        writer.write((this.channel! as any).getBytes());
        writer.writeVector(this.id!, (item) => {
            writer.writeInt(item);
        });
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeAffectedMessages {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): DeleteMessages {
        const args: any = {};
        const _channel = reader.tgReadObject();
        args.channel = _channel;
        const _id = reader.readVector((reader) => {
            const item = reader.readInt();
            return item;
        });
        args.id = _id;
        return new DeleteMessages(args);
    }
}