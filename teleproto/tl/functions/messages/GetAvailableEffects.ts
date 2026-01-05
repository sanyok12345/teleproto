import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeAvailableEffects } from "../../types/messages/TypeAvailableEffects";

export class GetAvailableEffects extends MTProtoRequest {
    static CONSTRUCTOR_ID = 3735161401;
    static SUBCLASS_OF_ID = 1148245437;
    static className = "messages.GetAvailableEffects";
    static classType = "request";

    hash?: number;

    constructor(args: { hash?: number } = {}) {
        super();
        this.hash = args.hash;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3735161401, false);
        writer.writeInt(this.hash!);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeAvailableEffects {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetAvailableEffects {
        const args: any = {};
        const _hash = reader.readInt();
        args.hash = _hash;
        return new GetAvailableEffects(args);
    }
}