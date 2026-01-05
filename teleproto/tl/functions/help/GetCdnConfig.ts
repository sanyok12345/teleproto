import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeCdnConfig } from "../../types/TypeCdnConfig";

export class GetCdnConfig extends MTProtoRequest {
    static CONSTRUCTOR_ID = 1375900482;
    static SUBCLASS_OF_ID = 3973724540;
    static className = "help.GetCdnConfig";
    static classType = "request";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1375900482, false);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeCdnConfig {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetCdnConfig {
        const args: any = {};
        return new GetCdnConfig(args);
    }
}