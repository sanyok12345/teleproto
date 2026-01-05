import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeMyBoosts } from "../../types/premium/TypeMyBoosts";

export class GetMyBoosts extends MTProtoRequest {
    static CONSTRUCTOR_ID = 199719754;
    static SUBCLASS_OF_ID = 2905936603;
    static className = "premium.GetMyBoosts";
    static classType = "request";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(199719754, false);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeMyBoosts {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetMyBoosts {
        const args: any = {};
        return new GetMyBoosts(args);
    }
}