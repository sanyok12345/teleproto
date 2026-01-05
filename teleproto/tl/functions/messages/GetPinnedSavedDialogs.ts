import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeSavedDialogs } from "../../types/messages/TypeSavedDialogs";

export class GetPinnedSavedDialogs extends MTProtoRequest {
    static CONSTRUCTOR_ID = 3594360032;
    static SUBCLASS_OF_ID = 1632352382;
    static className = "messages.GetPinnedSavedDialogs";
    static classType = "request";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3594360032, false);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeSavedDialogs {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetPinnedSavedDialogs {
        const args: any = {};
        return new GetPinnedSavedDialogs(args);
    }
}