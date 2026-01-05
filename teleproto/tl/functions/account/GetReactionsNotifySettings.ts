import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeReactionsNotifySettings } from "../../types/TypeReactionsNotifySettings";

export class GetReactionsNotifySettings extends MTProtoRequest {
    static CONSTRUCTOR_ID = 115172684;
    static SUBCLASS_OF_ID = 2382301265;
    static className = "account.GetReactionsNotifySettings";
    static classType = "request";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(115172684, false);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeReactionsNotifySettings {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetReactionsNotifySettings {
        const args: any = {};
        return new GetReactionsNotifySettings(args);
    }
}