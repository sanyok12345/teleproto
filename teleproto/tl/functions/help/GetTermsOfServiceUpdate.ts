import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeTermsOfServiceUpdate } from "../../types/help/TypeTermsOfServiceUpdate";

export class GetTermsOfServiceUpdate extends MTProtoRequest {
    static CONSTRUCTOR_ID = 749019089;
    static SUBCLASS_OF_ID = 691808631;
    static className = "help.GetTermsOfServiceUpdate";
    static classType = "request";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(749019089, false);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeTermsOfServiceUpdate {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetTermsOfServiceUpdate {
        const args: any = {};
        return new GetTermsOfServiceUpdate(args);
    }
}