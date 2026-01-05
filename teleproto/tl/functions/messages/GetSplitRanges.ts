import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeMessageRange } from "../../types/TypeMessageRange";

export class GetSplitRanges extends MTProtoRequest {
    static CONSTRUCTOR_ID = 486505992;
    static SUBCLASS_OF_ID = 1537549572;
    static className = "messages.GetSplitRanges";
    static classType = "request";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(486505992, false);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeMessageRange[] {
        const result = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetSplitRanges {
        const args: any = {};
        return new GetSplitRanges(args);
    }
}