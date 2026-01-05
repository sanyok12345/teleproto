import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeSupportName } from "../../types/help/TypeSupportName";

export class GetSupportName extends MTProtoRequest {
    static CONSTRUCTOR_ID = 3546343212;
    static SUBCLASS_OF_ID = 2135996354;
    static className = "help.GetSupportName";
    static classType = "request";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3546343212, false);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeSupportName {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetSupportName {
        const args: any = {};
        return new GetSupportName(args);
    }
}