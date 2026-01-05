import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeInviteText } from "../../types/help/TypeInviteText";

export class GetInviteText extends MTProtoRequest {
    static CONSTRUCTOR_ID = 1295590211;
    static SUBCLASS_OF_ID = 3480267317;
    static className = "help.GetInviteText";
    static classType = "request";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1295590211, false);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeInviteText {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetInviteText {
        const args: any = {};
        return new GetInviteText(args);
    }
}