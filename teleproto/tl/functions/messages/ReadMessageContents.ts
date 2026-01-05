import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeAffectedMessages } from "../../types/messages/TypeAffectedMessages";

export class ReadMessageContents extends MTProtoRequest {
    static CONSTRUCTOR_ID = 916930423;
    static SUBCLASS_OF_ID = 3469983854;
    static className = "messages.ReadMessageContents";
    static classType = "request";

    id?: number[];

    constructor(args: { id?: number[] } = {}) {
        super();
        this.id = args.id;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(916930423, false);
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

    static fromReader(reader: BinaryReader): ReadMessageContents {
        const args: any = {};
        const _id = reader.readVector((reader) => {
            const item = reader.readInt();
            return item;
        });
        args.id = _id;
        return new ReadMessageContents(args);
    }
}