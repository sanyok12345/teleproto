import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeUpdates } from "../../types/TypeUpdates";

export class GetPaidReactionPrivacy extends MTProtoRequest {
    static CONSTRUCTOR_ID = 1193563562;
    static SUBCLASS_OF_ID = 2331323052;
    static className = "messages.GetPaidReactionPrivacy";
    static classType = "request";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1193563562, false);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeUpdates {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetPaidReactionPrivacy {
        const args: any = {};
        return new GetPaidReactionPrivacy(args);
    }
}