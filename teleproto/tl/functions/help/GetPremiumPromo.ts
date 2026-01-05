import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypePremiumPromo } from "../../types/help/TypePremiumPromo";

export class GetPremiumPromo extends MTProtoRequest {
    static CONSTRUCTOR_ID = 3088815060;
    static SUBCLASS_OF_ID = 3381109560;
    static className = "help.GetPremiumPromo";
    static classType = "request";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3088815060, false);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypePremiumPromo {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetPremiumPromo {
        const args: any = {};
        return new GetPremiumPromo(args);
    }
}