import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypePasskeyRegistrationOptions } from "../../types/account/TypePasskeyRegistrationOptions";

export class InitPasskeyRegistration extends MTProtoRequest {
    static CONSTRUCTOR_ID = 1117079528;
    static SUBCLASS_OF_ID = 874349540;
    static className = "account.InitPasskeyRegistration";
    static classType = "request";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1117079528, false);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypePasskeyRegistrationOptions {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): InitPasskeyRegistration {
        const args: any = {};
        return new InitPasskeyRegistration(args);
    }
}