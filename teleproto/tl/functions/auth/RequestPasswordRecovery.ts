import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypePasswordRecovery } from "../../types/auth/TypePasswordRecovery";

export class RequestPasswordRecovery extends MTProtoRequest {
    static CONSTRUCTOR_ID = 3633822822;
    static SUBCLASS_OF_ID = 4201829434;
    static className = "auth.RequestPasswordRecovery";
    static classType = "request";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3633822822, false);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypePasswordRecovery {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): RequestPasswordRecovery {
        const args: any = {};
        return new RequestPasswordRecovery(args);
    }
}