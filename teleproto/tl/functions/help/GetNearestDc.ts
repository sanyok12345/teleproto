import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeNearestDc } from "../../types/TypeNearestDc";

export class GetNearestDc extends MTProtoRequest {
    static CONSTRUCTOR_ID = 531836966;
    static SUBCLASS_OF_ID = 947323999;
    static className = "help.GetNearestDc";
    static classType = "request";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(531836966, false);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeNearestDc {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetNearestDc {
        const args: any = {};
        return new GetNearestDc(args);
    }
}