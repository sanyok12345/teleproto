import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";

export class DeclinePasswordReset extends MTProtoRequest {
    static CONSTRUCTOR_ID = 1284770294;
    static SUBCLASS_OF_ID = 4122188204;
    static className = "account.DeclinePasswordReset";
    static classType = "request";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1284770294, false);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): boolean {
        const result = reader.tgReadBool();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): DeclinePasswordReset {
        const args: any = {};
        return new DeclinePasswordReset(args);
    }
}