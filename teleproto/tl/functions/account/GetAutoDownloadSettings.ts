import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeAutoDownloadSettings } from "../../types/account/TypeAutoDownloadSettings";

export class GetAutoDownloadSettings extends MTProtoRequest {
    static CONSTRUCTOR_ID = 1457130303;
    static SUBCLASS_OF_ID = 800610593;
    static className = "account.GetAutoDownloadSettings";
    static classType = "request";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1457130303, false);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeAutoDownloadSettings {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetAutoDownloadSettings {
        const args: any = {};
        return new GetAutoDownloadSettings(args);
    }
}