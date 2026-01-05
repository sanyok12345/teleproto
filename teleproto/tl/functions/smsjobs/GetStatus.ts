import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeStatus } from "../../types/smsjobs/TypeStatus";

export class GetStatus extends MTProtoRequest {
    static CONSTRUCTOR_ID = 279353576;
    static SUBCLASS_OF_ID = 3448711973;
    static className = "smsjobs.GetStatus";
    static classType = "request";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(279353576, false);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeStatus {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetStatus {
        const args: any = {};
        return new GetStatus(args);
    }
}