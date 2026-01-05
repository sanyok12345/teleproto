import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { TypeStarsRevenueAdsAccountUrl } from "../../types/payments/TypeStarsRevenueAdsAccountUrl";

export class GetStarsRevenueAdsAccountUrl extends MTProtoRequest {
    static CONSTRUCTOR_ID = 3520589765;
    static SUBCLASS_OF_ID = 1243777813;
    static className = "payments.GetStarsRevenueAdsAccountUrl";
    static classType = "request";

    peer?: EntityLike;

    constructor(args: { peer?: EntityLike } = {}) {
        super();
        this.peer = args.peer;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3520589765, false);
        writer.write((this.peer! as any).getBytes());
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeStarsRevenueAdsAccountUrl {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetStarsRevenueAdsAccountUrl {
        const args: any = {};
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        return new GetStarsRevenueAdsAccountUrl(args);
    }
}