import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeContentSettings } from "../../types/account/TypeContentSettings";

export class GetContentSettings extends MTProtoRequest {
    static CONSTRUCTOR_ID = 2342210990;
    static SUBCLASS_OF_ID = 2923427985;
    static className = "account.GetContentSettings";
    static classType = "request";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2342210990, false);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeContentSettings {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetContentSettings {
        const args: any = {};
        return new GetContentSettings(args);
    }
}