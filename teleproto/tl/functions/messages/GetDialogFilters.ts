import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeDialogFilters } from "../../types/messages/TypeDialogFilters";

export class GetDialogFilters extends MTProtoRequest {
    static CONSTRUCTOR_ID = 4023684233;
    static SUBCLASS_OF_ID = 2785014199;
    static className = "messages.GetDialogFilters";
    static classType = "request";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(4023684233, false);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeDialogFilters {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetDialogFilters {
        const args: any = {};
        return new GetDialogFilters(args);
    }
}