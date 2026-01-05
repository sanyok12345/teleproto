import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeStarGiftUpgradeAttributes } from "../../types/payments/TypeStarGiftUpgradeAttributes";

export class GetStarGiftUpgradeAttributes extends MTProtoRequest {
    static CONSTRUCTOR_ID = 1828948824;
    static SUBCLASS_OF_ID = 256290031;
    static className = "payments.GetStarGiftUpgradeAttributes";
    static classType = "request";

    giftId!: bigint;

    constructor(args: { giftId?: bigint } = {}) {
        super();
        this.giftId = args.giftId!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1828948824, false);
        writer.writeLargeInt(this.giftId, 64);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeStarGiftUpgradeAttributes {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetStarGiftUpgradeAttributes {
        const args: any = {};
        const _giftId = reader.readLargeInt(64);
        args.giftId = _giftId;
        return new GetStarGiftUpgradeAttributes(args);
    }
}