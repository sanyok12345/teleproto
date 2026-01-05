import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeChats } from "../../types/messages/TypeChats";

export class GetChats extends MTProtoRequest {
    static CONSTRUCTOR_ID = 1240027791;
    static SUBCLASS_OF_ID = 2580925204;
    static className = "messages.GetChats";
    static classType = "request";

    id?: bigint[];

    constructor(args: { id?: bigint[] } = {}) {
        super();
        this.id = args.id;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1240027791, false);
        writer.writeVector(this.id!, (item) => {
            writer.writeLargeInt(item, 64);
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

    static fromReader(reader: BinaryReader): GetChats {
        const args: any = {};
        const _id = reader.readVector((reader) => {
            const item = reader.readLargeInt(64);
            return item;
        });
        args.id = _id;
        return new GetChats(args);
    }
}