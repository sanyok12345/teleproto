import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypePromoData } from "../../types/help/TypePromoData";

export class GetPromoData extends MTProtoRequest {
    static CONSTRUCTOR_ID = 3231151137;
    static SUBCLASS_OF_ID = 2639877442;
    static className = "help.GetPromoData";
    static classType = "request";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3231151137, false);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypePromoData {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetPromoData {
        const args: any = {};
        return new GetPromoData(args);
    }
}