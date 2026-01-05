import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeDefaultHistoryTTL } from "../../types/TypeDefaultHistoryTTL";

export class GetDefaultHistoryTTL extends MTProtoRequest {
    static CONSTRUCTOR_ID = 1703637384;
    static SUBCLASS_OF_ID = 4027396967;
    static className = "messages.GetDefaultHistoryTTL";
    static classType = "request";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1703637384, false);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeDefaultHistoryTTL {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetDefaultHistoryTTL {
        const args: any = {};
        return new GetDefaultHistoryTTL(args);
    }
}