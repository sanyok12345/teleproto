import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeAccountDaysTTL } from "../../types/TypeAccountDaysTTL";

export class GetAccountTTL extends MTProtoRequest {
    static CONSTRUCTOR_ID = 150761757;
    static SUBCLASS_OF_ID = 3131284872;
    static className = "account.GetAccountTTL";
    static classType = "request";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(150761757, false);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeAccountDaysTTL {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetAccountTTL {
        const args: any = {};
        return new GetAccountTTL(args);
    }
}