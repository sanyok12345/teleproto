import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";

export class ResendPasswordEmail extends MTProtoRequest {
    static CONSTRUCTOR_ID = 2055154197;
    static SUBCLASS_OF_ID = 4122188204;
    static className = "account.ResendPasswordEmail";
    static classType = "request";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2055154197, false);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): boolean {
        const result = reader.tgReadBool();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): ResendPasswordEmail {
        const args: any = {};
        return new ResendPasswordEmail(args);
    }
}