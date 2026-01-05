import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeStarsGiveawayOption } from "../../types/TypeStarsGiveawayOption";

export class GetStarsGiveawayOptions extends MTProtoRequest {
    static CONSTRUCTOR_ID = 3172924734;
    static SUBCLASS_OF_ID = 4175114409;
    static className = "payments.GetStarsGiveawayOptions";
    static classType = "request";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3172924734, false);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeStarsGiveawayOption[] {
        const result = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetStarsGiveawayOptions {
        const args: any = {};
        return new GetStarsGiveawayOptions(args);
    }
}