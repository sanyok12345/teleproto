import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";

export class ClearRecentReactions extends MTProtoRequest {
    static CONSTRUCTOR_ID = 2650730420;
    static SUBCLASS_OF_ID = 4122188204;
    static className = "messages.ClearRecentReactions";
    static classType = "request";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2650730420, false);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): boolean {
        const result = reader.tgReadBool();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): ClearRecentReactions {
        const args: any = {};
        return new ClearRecentReactions(args);
    }
}