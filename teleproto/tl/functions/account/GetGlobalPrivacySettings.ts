import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeGlobalPrivacySettings } from "../../types/TypeGlobalPrivacySettings";

export class GetGlobalPrivacySettings extends MTProtoRequest {
    static CONSTRUCTOR_ID = 3945483510;
    static SUBCLASS_OF_ID = 3373160304;
    static className = "account.GetGlobalPrivacySettings";
    static classType = "request";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3945483510, false);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeGlobalPrivacySettings {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetGlobalPrivacySettings {
        const args: any = {};
        return new GetGlobalPrivacySettings(args);
    }
}