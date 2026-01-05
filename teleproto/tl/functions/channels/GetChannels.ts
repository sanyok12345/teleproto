import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { TypeChats } from "../../types/messages/TypeChats";

export class GetChannels extends MTProtoRequest {
    static CONSTRUCTOR_ID = 176122811;
    static SUBCLASS_OF_ID = 2580925204;
    static className = "channels.GetChannels";
    static classType = "request";

    id?: EntityLike[];

    constructor(args: { id?: EntityLike[] } = {}) {
        super();
        this.id = args.id;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(176122811, false);
        writer.writeVector(this.id!, (item) => {
            writer.write((item as any).getBytes());
        });
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeChats {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetChannels {
        const args: any = {};
        const _id = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.id = _id;
        return new GetChannels(args);
    }
}