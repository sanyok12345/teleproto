import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeAutoSaveSettings } from "../../types/account/TypeAutoSaveSettings";

export class GetAutoSaveSettings extends MTProtoRequest {
    static CONSTRUCTOR_ID = 2915810522;
    static SUBCLASS_OF_ID = 1221537538;
    static className = "account.GetAutoSaveSettings";
    static classType = "request";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2915810522, false);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeAutoSaveSettings {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetAutoSaveSettings {
        const args: any = {};
        return new GetAutoSaveSettings(args);
    }
}