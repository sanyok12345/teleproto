import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeDataJSON } from "../../types/TypeDataJSON";

export class GetCallConfig extends MTProtoRequest {
    static CONSTRUCTOR_ID = 1430593449;
    static SUBCLASS_OF_ID = 2902676200;
    static className = "phone.GetCallConfig";
    static classType = "request";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1430593449, false);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeDataJSON {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetCallConfig {
        const args: any = {};
        return new GetCallConfig(args);
    }
}