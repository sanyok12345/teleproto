import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeBusinessChatLinks } from "../../types/account/TypeBusinessChatLinks";

export class GetBusinessChatLinks extends MTProtoRequest {
    static CONSTRUCTOR_ID = 1869667809;
    static SUBCLASS_OF_ID = 3334097457;
    static className = "account.GetBusinessChatLinks";
    static classType = "request";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1869667809, false);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeBusinessChatLinks {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetBusinessChatLinks {
        const args: any = {};
        return new GetBusinessChatLinks(args);
    }
}