import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { MTProtoRequest } from "../MTProtoRequest";
import { TypeDestroyAuthKeyRes } from "../types/TypeDestroyAuthKeyRes";

export class DestroyAuthKey extends MTProtoRequest {
    static CONSTRUCTOR_ID = 3510849888;
    static SUBCLASS_OF_ID = 2190599822;
    static className = "DestroyAuthKey";
    static classType = "request";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3510849888, false);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeDestroyAuthKeyRes {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): DestroyAuthKey {
        const args: any = {};
        return new DestroyAuthKey(args);
    }
}