import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { TypeJoinAsPeers } from "../../types/phone/TypeJoinAsPeers";

export class GetGroupCallJoinAs extends MTProtoRequest {
    static CONSTRUCTOR_ID = 4017889594;
    static SUBCLASS_OF_ID = 3031920891;
    static className = "phone.GetGroupCallJoinAs";
    static classType = "request";

    peer?: EntityLike;

    constructor(args: { peer?: EntityLike } = {}) {
        super();
        this.peer = args.peer;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(4017889594, false);
        writer.write((this.peer! as any).getBytes());
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeJoinAsPeers {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetGroupCallJoinAs {
        const args: any = {};
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        return new GetGroupCallJoinAs(args);
    }
}