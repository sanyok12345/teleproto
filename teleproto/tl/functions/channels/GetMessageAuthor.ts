import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { TypeUser } from "../../types/TypeUser";

export class GetMessageAuthor extends MTProtoRequest {
    static CONSTRUCTOR_ID = 3974275302;
    static SUBCLASS_OF_ID = 765557111;
    static className = "channels.GetMessageAuthor";
    static classType = "request";

    channel?: EntityLike;
    id?: number;

    constructor(args: { channel?: EntityLike, id?: number } = {}) {
        super();
        this.channel = args.channel;
        this.id = args.id;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3974275302, false);
        writer.write((this.channel! as any).getBytes());
        writer.writeInt(this.id!);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeUser {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetMessageAuthor {
        const args: any = {};
        const _channel = reader.tgReadObject();
        args.channel = _channel;
        const _id = reader.readInt();
        args.id = _id;
        return new GetMessageAuthor(args);
    }
}