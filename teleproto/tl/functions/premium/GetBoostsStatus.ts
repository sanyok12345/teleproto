import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { TypeBoostsStatus } from "../../types/premium/TypeBoostsStatus";

export class GetBoostsStatus extends MTProtoRequest {
    static CONSTRUCTOR_ID = 70197089;
    static SUBCLASS_OF_ID = 3273333433;
    static className = "premium.GetBoostsStatus";
    static classType = "request";

    peer?: EntityLike;

    constructor(args: { peer?: EntityLike } = {}) {
        super();
        this.peer = args.peer;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(70197089, false);
        writer.write((this.peer! as any).getBytes());
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeBoostsStatus {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetBoostsStatus {
        const args: any = {};
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        return new GetBoostsStatus(args);
    }
}