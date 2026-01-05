import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeResetPasswordResult } from "../../types/account/TypeResetPasswordResult";

export class ResetPassword extends MTProtoRequest {
    static CONSTRUCTOR_ID = 2466827803;
    static SUBCLASS_OF_ID = 1230009366;
    static className = "account.ResetPassword";
    static classType = "request";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2466827803, false);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeResetPasswordResult {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): ResetPassword {
        const args: any = {};
        return new ResetPassword(args);
    }
}