import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeExportedContactToken } from "../../types/TypeExportedContactToken";

export class ExportContactToken extends MTProtoRequest {
    static CONSTRUCTOR_ID = 4167385127;
    static SUBCLASS_OF_ID = 2262679249;
    static className = "contacts.ExportContactToken";
    static classType = "request";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(4167385127, false);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeExportedContactToken {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): ExportContactToken {
        const args: any = {};
        return new ExportContactToken(args);
    }
}