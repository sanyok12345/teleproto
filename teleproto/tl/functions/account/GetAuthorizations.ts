import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeAuthorizations } from "../../types/account/TypeAuthorizations";

export class GetAuthorizations extends MTProtoRequest {
    static CONSTRUCTOR_ID = 3810574680;
    static SUBCLASS_OF_ID = 200663295;
    static className = "account.GetAuthorizations";
    static classType = "request";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3810574680, false);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeAuthorizations {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetAuthorizations {
        const args: any = {};
        return new GetAuthorizations(args);
    }
}