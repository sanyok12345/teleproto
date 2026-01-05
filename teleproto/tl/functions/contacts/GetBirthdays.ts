import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeContactBirthdays } from "../../types/contacts/TypeContactBirthdays";

export class GetBirthdays extends MTProtoRequest {
    static CONSTRUCTOR_ID = 3673008228;
    static SUBCLASS_OF_ID = 242920447;
    static className = "contacts.GetBirthdays";
    static classType = "request";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3673008228, false);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeContactBirthdays {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetBirthdays {
        const args: any = {};
        return new GetBirthdays(args);
    }
}