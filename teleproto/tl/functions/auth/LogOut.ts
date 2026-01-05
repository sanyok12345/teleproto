import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeLoggedOut } from "../../types/auth/TypeLoggedOut";

export class LogOut extends MTProtoRequest {
    static CONSTRUCTOR_ID = 1047706137;
    static SUBCLASS_OF_ID = 176177941;
    static className = "auth.LogOut";
    static classType = "request";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1047706137, false);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeLoggedOut {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): LogOut {
        const args: any = {};
        return new LogOut(args);
    }
}