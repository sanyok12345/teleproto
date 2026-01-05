import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeSupport } from "../../types/help/TypeSupport";

export class GetSupport extends MTProtoRequest {
    static CONSTRUCTOR_ID = 2631862477;
    static SUBCLASS_OF_ID = 1901706475;
    static className = "help.GetSupport";
    static classType = "request";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2631862477, false);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeSupport {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetSupport {
        const args: any = {};
        return new GetSupport(args);
    }
}