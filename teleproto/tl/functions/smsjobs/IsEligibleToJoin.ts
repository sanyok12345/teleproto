import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeEligibilityToJoin } from "../../types/smsjobs/TypeEligibilityToJoin";

export class IsEligibleToJoin extends MTProtoRequest {
    static CONSTRUCTOR_ID = 249313744;
    static SUBCLASS_OF_ID = 1589076134;
    static className = "smsjobs.IsEligibleToJoin";
    static classType = "request";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(249313744, false);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeEligibilityToJoin {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): IsEligibleToJoin {
        const args: any = {};
        return new IsEligibleToJoin(args);
    }
}