import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypePasskeys } from "../../types/account/TypePasskeys";

export class GetPasskeys extends MTProtoRequest {
    static CONSTRUCTOR_ID = 3927903314;
    static SUBCLASS_OF_ID = 618471518;
    static className = "account.GetPasskeys";
    static classType = "request";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3927903314, false);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypePasskeys {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetPasskeys {
        const args: any = {};
        return new GetPasskeys(args);
    }
}