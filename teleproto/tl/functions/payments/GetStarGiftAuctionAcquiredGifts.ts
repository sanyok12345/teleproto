import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeStarGiftAuctionAcquiredGifts } from "../../types/payments/TypeStarGiftAuctionAcquiredGifts";

export class GetStarGiftAuctionAcquiredGifts extends MTProtoRequest {
    static CONSTRUCTOR_ID = 1805831148;
    static SUBCLASS_OF_ID = 2802321947;
    static className = "payments.GetStarGiftAuctionAcquiredGifts";
    static classType = "request";

    giftId!: bigint;

    constructor(args: { giftId?: bigint } = {}) {
        super();
        this.giftId = args.giftId!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1805831148, false);
        writer.writeLargeInt(this.giftId, 64);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeStarGiftAuctionAcquiredGifts {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetStarGiftAuctionAcquiredGifts {
        const args: any = {};
        const _giftId = reader.readLargeInt(64);
        args.giftId = _giftId;
        return new GetStarGiftAuctionAcquiredGifts(args);
    }
}