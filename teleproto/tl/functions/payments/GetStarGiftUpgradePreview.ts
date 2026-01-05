import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeStarGiftUpgradePreview } from "../../types/payments/TypeStarGiftUpgradePreview";

export class GetStarGiftUpgradePreview extends MTProtoRequest {
    static CONSTRUCTOR_ID = 2627386545;
    static SUBCLASS_OF_ID = 1579903175;
    static className = "payments.GetStarGiftUpgradePreview";
    static classType = "request";

    giftId!: bigint;

    constructor(args: { giftId?: bigint } = {}) {
        super();
        this.giftId = args.giftId!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2627386545, false);
        writer.writeLargeInt(this.giftId, 64);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeStarGiftUpgradePreview {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetStarGiftUpgradePreview {
        const args: any = {};
        const _giftId = reader.readLargeInt(64);
        args.giftId = _giftId;
        return new GetStarGiftUpgradePreview(args);
    }
}