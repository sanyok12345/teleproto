import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeDialogFilterSuggested } from "../../types/TypeDialogFilterSuggested";

export class GetSuggestedDialogFilters extends MTProtoRequest {
    static CONSTRUCTOR_ID = 2728186924;
    static SUBCLASS_OF_ID = 2066312249;
    static className = "messages.GetSuggestedDialogFilters";
    static classType = "request";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2728186924, false);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeDialogFilterSuggested[] {
        const result = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetSuggestedDialogFilters {
        const args: any = {};
        return new GetSuggestedDialogFilters(args);
    }
}