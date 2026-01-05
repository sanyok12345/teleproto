import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeChats } from "../../types/messages/TypeChats";

export class GetChatsToSend extends MTProtoRequest {
    static CONSTRUCTOR_ID = 2775223136;
    static SUBCLASS_OF_ID = 2580925204;
    static className = "stories.GetChatsToSend";
    static classType = "request";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2775223136, false);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeChats {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetChatsToSend {
        const args: any = {};
        return new GetChatsToSend(args);
    }
}