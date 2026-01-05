import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeState } from "../../types/updates/TypeState";

export class GetState extends MTProtoRequest {
    static CONSTRUCTOR_ID = 3990128682;
    static SUBCLASS_OF_ID = 601823745;
    static className = "updates.GetState";
    static classType = "request";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3990128682, false);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeState {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetState {
        const args: any = {};
        return new GetState(args);
    }
}