import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeWebAuthorizations } from "../../types/account/TypeWebAuthorizations";

export class GetWebAuthorizations extends MTProtoRequest {
    static CONSTRUCTOR_ID = 405695855;
    static SUBCLASS_OF_ID = 2587253554;
    static className = "account.GetWebAuthorizations";
    static classType = "request";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(405695855, false);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeWebAuthorizations {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetWebAuthorizations {
        const args: any = {};
        return new GetWebAuthorizations(args);
    }
}