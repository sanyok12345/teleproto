import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeUser } from "../../types/TypeUser";

export class GetAdminedBots extends MTProtoRequest {
    static CONSTRUCTOR_ID = 2960203139;
    static SUBCLASS_OF_ID = 67557965;
    static className = "bots.GetAdminedBots";
    static classType = "request";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2960203139, false);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeUser[] {
        const result = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetAdminedBots {
        const args: any = {};
        return new GetAdminedBots(args);
    }
}