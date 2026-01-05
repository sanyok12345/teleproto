import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeAvailableReactions } from "../../types/messages/TypeAvailableReactions";

export class GetAvailableReactions extends MTProtoRequest {
    static CONSTRUCTOR_ID = 417243308;
    static SUBCLASS_OF_ID = 3827740034;
    static className = "messages.GetAvailableReactions";
    static classType = "request";

    hash?: number;

    constructor(args: { hash?: number } = {}) {
        super();
        this.hash = args.hash;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(417243308, false);
        writer.writeInt(this.hash!);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeAvailableReactions {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetAvailableReactions {
        const args: any = {};
        const _hash = reader.readInt();
        args.hash = _hash;
        return new GetAvailableReactions(args);
    }
}