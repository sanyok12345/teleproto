import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeConnectedBots } from "../../types/account/TypeConnectedBots";

export class GetConnectedBots extends MTProtoRequest {
    static CONSTRUCTOR_ID = 1319421967;
    static SUBCLASS_OF_ID = 3838506963;
    static className = "account.GetConnectedBots";
    static classType = "request";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1319421967, false);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeConnectedBots {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetConnectedBots {
        const args: any = {};
        return new GetConnectedBots(args);
    }
}