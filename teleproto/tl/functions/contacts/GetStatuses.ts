import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeContactStatus } from "../../types/TypeContactStatus";

export class GetStatuses extends MTProtoRequest {
    static CONSTRUCTOR_ID = 3299038190;
    static SUBCLASS_OF_ID = 3749797008;
    static className = "contacts.GetStatuses";
    static classType = "request";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3299038190, false);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeContactStatus[] {
        const result = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetStatuses {
        const args: any = {};
        return new GetStatuses(args);
    }
}