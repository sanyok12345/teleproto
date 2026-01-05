import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeSecureValue } from "../../types/TypeSecureValue";

export class GetAllSecureValues extends MTProtoRequest {
    static CONSTRUCTOR_ID = 2995305597;
    static SUBCLASS_OF_ID = 3895345441;
    static className = "account.GetAllSecureValues";
    static classType = "request";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2995305597, false);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeSecureValue[] {
        const result = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetAllSecureValues {
        const args: any = {};
        return new GetAllSecureValues(args);
    }
}