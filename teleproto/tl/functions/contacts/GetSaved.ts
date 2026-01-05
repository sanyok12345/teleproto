import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeSavedContact } from "../../types/TypeSavedContact";

export class GetSaved extends MTProtoRequest {
    static CONSTRUCTOR_ID = 2196890527;
    static SUBCLASS_OF_ID = 158718959;
    static className = "contacts.GetSaved";
    static classType = "request";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2196890527, false);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeSavedContact[] {
        const result = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetSaved {
        const args: any = {};
        return new GetSaved(args);
    }
}