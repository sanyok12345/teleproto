import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeStarsTopupOption } from "../../types/TypeStarsTopupOption";

export class GetStarsTopupOptions extends MTProtoRequest {
    static CONSTRUCTOR_ID = 3222194131;
    static SUBCLASS_OF_ID = 3573451417;
    static className = "payments.GetStarsTopupOptions";
    static classType = "request";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3222194131, false);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeStarsTopupOption[] {
        const result = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetStarsTopupOptions {
        const args: any = {};
        return new GetStarsTopupOptions(args);
    }
}