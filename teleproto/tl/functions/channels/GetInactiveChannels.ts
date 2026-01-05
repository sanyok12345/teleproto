import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeInactiveChats } from "../../types/messages/TypeInactiveChats";

export class GetInactiveChannels extends MTProtoRequest {
    static CONSTRUCTOR_ID = 300429806;
    static SUBCLASS_OF_ID = 2348013524;
    static className = "channels.GetInactiveChannels";
    static classType = "request";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(300429806, false);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeInactiveChats {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetInactiveChannels {
        const args: any = {};
        return new GetInactiveChannels(args);
    }
}