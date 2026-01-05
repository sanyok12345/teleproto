import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeConfig } from "../../types/TypeConfig";

export class GetConfig extends MTProtoRequest {
    static CONSTRUCTOR_ID = 3304659051;
    static SUBCLASS_OF_ID = 3542493770;
    static className = "help.GetConfig";
    static classType = "request";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3304659051, false);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeConfig {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetConfig {
        const args: any = {};
        return new GetConfig(args);
    }
}