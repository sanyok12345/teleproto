import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";

export class DeleteAutoSaveExceptions extends MTProtoRequest {
    static CONSTRUCTOR_ID = 1404829728;
    static SUBCLASS_OF_ID = 4122188204;
    static className = "account.DeleteAutoSaveExceptions";
    static classType = "request";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1404829728, false);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): boolean {
        const result = reader.tgReadBool();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): DeleteAutoSaveExceptions {
        const args: any = {};
        return new DeleteAutoSaveExceptions(args);
    }
}