import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { TypeChatOnlines } from "../../types/TypeChatOnlines";

export class GetOnlines extends MTProtoRequest {
    static CONSTRUCTOR_ID = 1848369232;
    static SUBCLASS_OF_ID = 2357301306;
    static className = "messages.GetOnlines";
    static classType = "request";

    peer?: EntityLike;

    constructor(args: { peer?: EntityLike } = {}) {
        super();
        this.peer = args.peer;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1848369232, false);
        writer.write((this.peer! as any).getBytes());
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeChatOnlines {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetOnlines {
        const args: any = {};
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        return new GetOnlines(args);
    }
}