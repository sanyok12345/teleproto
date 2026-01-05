import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypePassword } from "../../types/account/TypePassword";

export class GetPassword extends MTProtoRequest {
    static CONSTRUCTOR_ID = 1418342645;
    static SUBCLASS_OF_ID = 1403130275;
    static className = "account.GetPassword";
    static classType = "request";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1418342645, false);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypePassword {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetPassword {
        const args: any = {};
        return new GetPassword(args);
    }
}