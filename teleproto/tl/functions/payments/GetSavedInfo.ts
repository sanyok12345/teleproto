import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeSavedInfo } from "../../types/payments/TypeSavedInfo";

export class GetSavedInfo extends MTProtoRequest {
    static CONSTRUCTOR_ID = 578650699;
    static SUBCLASS_OF_ID = 2906452294;
    static className = "payments.GetSavedInfo";
    static classType = "request";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(578650699, false);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeSavedInfo {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetSavedInfo {
        const args: any = {};
        return new GetSavedInfo(args);
    }
}